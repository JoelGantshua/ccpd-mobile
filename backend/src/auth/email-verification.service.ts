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
  generateEmailVerificationCode,
  hashEmailCode,
} from './security/email-token.js';

@Injectable()
export class EmailVerificationService {
  constructor(private readonly prisma: PrismaService) {}

  async issueToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, emailVerifiedAt: true },
    });

    if (!user) {
      throw new NotFoundException('Utilisateur introuvable');
    }

    if (user.emailVerifiedAt) {
      throw new BadRequestException('Adresse deja verifiee');
    }

    const generated = generateEmailVerificationCode(userId);

    const result = await this.prisma.$queryRaw<Array<{ id: string }>>`
      INSERT INTO "EmailVerificationToken" AS existing (
        "id", "userId", "tokenHash", "expiresAt",
        "createdAt", "attempts"
      )
      SELECT
        ${randomUUID()}, u."id",
        ${generated.codeHash}, ${generated.expiresAt},
        CURRENT_TIMESTAMP, 0
      FROM "User" AS u
      WHERE u."id" = ${userId}
        AND u."emailVerifiedAt" IS NULL

      ON CONFLICT ("userId") DO UPDATE
      SET
        "tokenHash" = EXCLUDED."tokenHash",
        "expiresAt" = EXCLUDED."expiresAt",
        "consumedAt" = NULL,
        "createdAt" = CURRENT_TIMESTAMP,
        "attempts" = 0
      WHERE existing."createdAt"
        <= CURRENT_TIMESTAMP - INTERVAL '5 minutes'

      RETURNING "id"::text AS id
    `;

    if (result.length !== 1) {
      throw new HttpException(
        'Veuillez patienter avant de demander un nouveau code',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    return {
      token: generated.code,
      expiresAt: generated.expiresAt,
    };
  }

  async consumeToken(
    email: string,
    code: string,
  ): Promise<{ verified: true }> {
    if (!/^\d{6}$/.test(code)) {
      throw new BadRequestException('Code invalide');
    }

    const normalizedEmail = email.trim().toLowerCase();

    const result = await this.prisma.$transaction(async (tx) => {
      const users = await tx.$queryRaw<
        Array<{ id: string }>
      >`
        SELECT "id"::text AS id
        FROM "User"
        WHERE LOWER("email") = ${normalizedEmail}
          AND "emailVerifiedAt" IS NULL
      `;

      if (users.length !== 1) return false;

      const userId = users[0].id;
      const codeHash = hashEmailCode(userId, code);

      const rows = await tx.$queryRaw<
        Array<{ matched: boolean }>
      >`
        UPDATE "EmailVerificationToken"
        SET "attempts" = "attempts" + 1
        WHERE "userId" = ${userId}
          AND "consumedAt" IS NULL
          AND "expiresAt" > CURRENT_TIMESTAMP
          AND "attempts" < 5
        RETURNING ("tokenHash" = ${codeHash}) AS matched
      `;

      if (rows.length !== 1 || !rows[0].matched) {
        return false;
      }

      const consumed = await tx.$queryRaw<
        Array<{ userId: string }>
      >`
        UPDATE "EmailVerificationToken"
        SET "consumedAt" = CURRENT_TIMESTAMP
        WHERE "userId" = ${userId}
          AND "consumedAt" IS NULL
        RETURNING "userId"
      `;

      if (consumed.length !== 1) return false;

      const verified = await tx.$queryRaw<
        Array<{ id: string }>
      >`
        UPDATE "User"
        SET
          "emailVerifiedAt" = CURRENT_TIMESTAMP,
          "updatedAt" = CURRENT_TIMESTAMP
        WHERE "id" = ${userId}
          AND "emailVerifiedAt" IS NULL
        RETURNING "id"::text AS id
      `;

      return verified.length === 1;
    });

    if (!result) {
      throw new UnauthorizedException(
        'Code incorrect, expire ou nombre de tentatives depasse',
      );
    }

    return { verified: true };
  }
}
