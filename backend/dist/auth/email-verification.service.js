var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { randomUUID } from 'node:crypto';
import { BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { generateEmailVerificationToken, hashEmailToken, } from './security/email-token.js';
let EmailVerificationService = class EmailVerificationService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async issueToken(userId) {
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
            throw new NotFoundException('Utilisateur introuvable');
        }
        if (user.emailVerifiedAt) {
            throw new BadRequestException('Adresse e-mail déjà vérifiée');
        }
        const generated = generateEmailVerificationToken();
        const result = await this.prisma.$queryRaw `
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
            throw new HttpException('Nouvelle demande temporairement indisponible', HttpStatus.TOO_MANY_REQUESTS);
        }
        return {
            token: generated.token,
            expiresAt: generated.expiresAt,
        };
    }
    async consumeToken(token) {
        if (typeof token !== 'string' ||
            !/^[a-f0-9]{64}$/.test(token)) {
            throw new BadRequestException('Jeton invalide');
        }
        const tokenHash = hashEmailToken(token);
        const result = await this.prisma.$queryRaw `
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
            throw new UnauthorizedException('Jeton invalide, expiré ou déjà utilisé');
        }
        return {
            verified: true,
        };
    }
};
EmailVerificationService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], EmailVerificationService);
export { EmailVerificationService };
//# sourceMappingURL=email-verification.service.js.map