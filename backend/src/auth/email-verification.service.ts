
import { randomUUID } from 'node:crypto';

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

import {
  generateEmailVerificationToken,
  hashEmailToken,
} from './security/email-token.js';

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Génération sécurisée d'un jeton de vérification.
   *
   * Un seul jeton par utilisateur.
   * Délai minimal de 5 minutes entre deux émissions.
   * Ancien jeton remplacé après ce délai.
   *
   * Le jeton brut est réservé à un usage interne.
   */
  async issueToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        emailVerifiedAt: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        'Utilisateur introuvable',
      );
    }

    if (user.emailVerifiedAt) {
      throw new BadRequestException(
        'Adresse e-mail déjà vérifiée',
      );
    }

    const generated = generateEmailVerificationToken();

    const result = await this.prisma.$queryRaw<
      Array<{ id: string }>
    >`
      INSERT INTO "EmailVerificationToken" AS existing (
        "id",
        "userId",
        "tokenHash",
        "expiresAt",
        "createdAt"
      )
      SELECT
        ${randomUUID()},
        u."id",
        ${generated.tokenHash},
        ${generated.expiresAt},
        CURRENT_TIMESTAMP
      FROM "User" AS u
      WHERE u."id" = ${userId}
        AND u."emailVerifiedAt" IS NULL

      ON CONFLICT ("userId") DO UPDATE
      SET
        "tokenHash" = EXCLUDED."tokenHash",
        "expiresAt" = EXCLUDED."expiresAt",
        "consumedAt" = NULL,
        "createdAt" = CURRENT_TIMESTAMP

      WHERE existing."createdAt"
        <= CURRENT_TIMESTAMP - INTERVAL '5 minutes'

      RETURNING "id"::text AS id
    `;

    if (result.length !== 1) {
      throw new HttpException(
        'Nouvelle demande temporairement indisponible',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return {
      token: generated.token,
      expiresAt: generated.expiresAt,
    };
  }

  /**
   * Consommation d'un jeton.
   *
   * Vérifie :
   * - le format du jeton ;
   * - sa validité ;
   * - son expiration ;
   * - son utilisation précédente ;
   * - l'état de vérification de l'utilisateur.
   *
   * La vérification de l'e-mail
   * n'active pas automatiquement le compte.
   */
  async consumeToken(
    token: string,
  ): Promise<{ verified: true }> {
    if (
      typeof token !== 'string' ||
      !/^[a-f0-9]{64}$/.test(token)
    ) {
      throw new BadRequestException(
        'Jeton invalide',
      );
    }

    const tokenHash = hashEmailToken(token);

    const result = await this.prisma.$queryRaw<
      Array<{ id: string }>
    >`
      WITH consumed AS (
        UPDATE "EmailVerificationToken" AS t

        SET
          "consumedAt" = CURRENT_TIMESTAMP

        WHERE t."tokenHash" = ${tokenHash}
          AND t."consumedAt" IS NULL
          AND t."expiresAt" > CURRENT_TIMESTAMP

          AND EXISTS (
            SELECT 1
            FROM "User" AS u
            WHERE u."id" = t."userId"
              AND u."emailVerifiedAt" IS NULL
          )

        RETURNING t."userId"
      )

      UPDATE "User" AS u

      SET
        "emailVerifiedAt" = CURRENT_TIMESTAMP,
        "updatedAt" = CURRENT_TIMESTAMP

      FROM consumed

      WHERE u."id" = consumed."userId"
        AND u."emailVerifiedAt" IS NULL

      RETURNING u."id"::text AS id
    `;

    if (result.length !== 1) {
      throw new UnauthorizedException(
        'Jeton invalide, expiré ou déjà utilisé',
      );
    }

    return {
      verified: true,
    };
  }
}
