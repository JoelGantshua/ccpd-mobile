
import { describe, expect, it, vi } from 'vitest';
import { HttpException } from '@nestjs/common';

import { EmailVerificationService } from './email-verification.service.js';
import { hashEmailToken } from './security/email-token.js';
import type { PrismaService } from '../prisma/prisma.service.js';

describe('EmailVerificationService - CCPD Bloc Est', () => {
  function setupIssueToken(
    options: {
      userExists?: boolean;
      emailVerified?: boolean;
      queryResult?: Array<{ id: string }>;
    } = {},
  ) {
    const prisma = {
      user: {
        findUnique: vi.fn().mockResolvedValue(
          options.userExists === false
            ? null
            : {
                id: 'user-test',
                emailVerifiedAt: options.emailVerified
                  ? new Date()
                  : null,
              },
        ),
      },
      $queryRaw: vi.fn().mockResolvedValue(
        options.queryResult ?? [{ id: 'token-test' }],
      ),
    };

    const service = new EmailVerificationService(
      prisma as unknown as PrismaService,
    );

    return { service, prisma };
  }

  describe('Emission des jetons', () => {
    it('envoie uniquement le hash du jeton a Prisma', async () => {
      const { service, prisma } = setupIssueToken();

      const result = await service.issueToken('user-test');

      expect(result.token).toMatch(/^[a-f0-9]{64}$/);
      expect(result.expiresAt).toBeInstanceOf(Date);

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);

      // Prisma recoit une requete SQL parametree :
      // premier argument = fragments SQL ;
      // arguments suivants = valeurs.
      const sqlArguments =
        prisma.$queryRaw.mock.calls[0].slice(1);

      expect(sqlArguments).toContain(
        hashEmailToken(result.token),
      );

      expect(sqlArguments).not.toContain(result.token);
    });

    it('refuse un email deja verifie', async () => {
      const { service, prisma } = setupIssueToken({
        emailVerified: true,
      });

      await expect(
        service.issueToken('user-test'),
      ).rejects.toThrow('Adresse e-mail déjà vérifiée');

      expect(prisma.$queryRaw).not.toHaveBeenCalled();
    });

    it('refuse un utilisateur inexistant', async () => {
      const { service, prisma } = setupIssueToken({
        userExists: false,
      });

      await expect(
        service.issueToken('user-inconnu'),
      ).rejects.toThrow('Utilisateur introuvable');

      expect(prisma.$queryRaw).not.toHaveBeenCalled();
    });

    it('retourne HTTP 429 quand PostgreSQL refuse une emission', async () => {
      const { service, prisma } = setupIssueToken({
        queryResult: [],
      });

      await expect(
        service.issueToken('user-test'),
      ).rejects.toSatisfy(
        (error: unknown) =>
          error instanceof HttpException &&
          error.getStatus() === 429,
      );

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('genere des jetons differents pour deux emissions autorisees', async () => {
      const { service } = setupIssueToken();

      const first = await service.issueToken('user-test');
      const second = await service.issueToken('user-test');

      expect(first.token).not.toBe(second.token);

      expect(hashEmailToken(first.token)).not.toBe(
        hashEmailToken(second.token),
      );
    });
  });

  describe('Consommation des jetons', () => {
    it('refuse un jeton mal forme sans acces a la base', async () => {
      const prisma = {
        $queryRaw: vi.fn(),
      };

      const service = new EmailVerificationService(
        prisma as unknown as PrismaService,
      );

      await expect(
        service.consumeToken('jeton-invalide'),
      ).rejects.toThrow();

      expect(prisma.$queryRaw).not.toHaveBeenCalled();
    });

    it('refuse un jeton deja utilise ou expire', async () => {
      const prisma = {
        $queryRaw: vi.fn().mockResolvedValue([]),
      };

      const service = new EmailVerificationService(
        prisma as unknown as PrismaService,
      );

      await expect(
        service.consumeToken('a'.repeat(64)),
      ).rejects.toThrow(
        'Jeton invalide, expiré ou déjà utilisé',
      );

      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('confirme la verification lorsque PostgreSQL retourne un utilisateur', async () => {
      const prisma = {
        $queryRaw: vi.fn().mockResolvedValue([
          { id: 'user-test' },
        ]),
      };

      const service = new EmailVerificationService(
        prisma as unknown as PrismaService,
      );

      const result = await service.consumeToken(
        'a'.repeat(64),
      );

      expect(result).toEqual({ verified: true });
      expect(prisma.$queryRaw).toHaveBeenCalledTimes(1);
    });

    it('refuse un jeton trop court', async () => {
      const prisma = {
        $queryRaw: vi.fn(),
      };

      const service = new EmailVerificationService(
        prisma as unknown as PrismaService,
      );

      await expect(
        service.consumeToken('jeton-trop-court'),
      ).rejects.toThrow();

      expect(prisma.$queryRaw).not.toHaveBeenCalled();
    });
  });
});
