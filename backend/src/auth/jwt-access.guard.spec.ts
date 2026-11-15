import { describe, expect, it, vi } from 'vitest';
import {
  UnauthorizedException,
  type ExecutionContext,
} from '@nestjs/common';
import type { JwtService } from '@nestjs/jwt';

import { JwtAccessGuard } from './jwt-access.guard.js';
import type { PrismaService } from '../prisma/prisma.service.js';

describe('JwtAccessGuard - CCPD Mobile', () => {
  const userId = '123e4567-e89b-42d3-a456-426614174000';
  const sessionId = '123e4567-e89b-42d3-a456-426614174001';

  function setup() {
    const request: {
      headers: { authorization?: string };
      user?: unknown;
    } = {
      headers: {
        authorization: 'Bearer jwt-valide',
      },
    };

    const context = {
      switchToHttp: () => ({
        getRequest: () => request,
      }),
    } as unknown as ExecutionContext;

    const jwt = {
      verifyAsync: vi.fn().mockResolvedValue({
        sub: userId,
        sid: sessionId,
        typ: 'access',
      }),
    };

    const prisma = {
      refreshSession: {
        findFirst: vi.fn().mockResolvedValue({
          id: sessionId,
        }),
      },
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: userId,
          fullName: 'Membre CCPD',
          role: 'MEMBRE',
          provinceId: '123e4567-e89b-42d3-a456-426614174002',
          isActive: true,
          emailVerifiedAt: new Date(),
        }),
      },
    };

    const guard = new JwtAccessGuard(
      jwt as unknown as JwtService,
      prisma as unknown as PrismaService,
    );

    return { guard, request, context, jwt, prisma };
  }

  it('autorise une session active', async () => {
    const { guard, context, request, prisma } = setup();

    await expect(guard.canActivate(context)).resolves.toBe(true);

    expect(request.user).toMatchObject({
      id: userId,
      role: 'MEMBRE',
    });

    const query =
      prisma.refreshSession.findFirst.mock.calls[0][0];

    expect(query.where.userId).toBe(userId);
    expect(query.where.id).toBe(sessionId);
    expect(query.where.revokedAt).toBeNull();
    expect(query.where.expiresAt.gt).toBeInstanceOf(Date);
  });

  it('refuse immediatement une session revoquee', async () => {
    const { guard, context, prisma } = setup();

    prisma.refreshSession.findFirst.mockResolvedValue(null);

    await expect(
      guard.canActivate(context),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it('refuse un JWT sans identifiant de session', async () => {
    const { guard, context, jwt, prisma } = setup();

    jwt.verifyAsync.mockResolvedValue({
      sub: userId,
      typ: 'access',
    });

    await expect(
      guard.canActivate(context),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(
      prisma.refreshSession.findFirst,
    ).not.toHaveBeenCalled();
  });

  it('refuse un compte desactive', async () => {
    const { guard, context, prisma } = setup();

    prisma.user.findUnique.mockResolvedValue({
      id: userId,
      isActive: false,
      emailVerifiedAt: new Date(),
    });

    await expect(
      guard.canActivate(context),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('refuse un JWT absent', async () => {
    const { guard, context, request, jwt } = setup();

    request.headers.authorization = undefined;

    await expect(
      guard.canActivate(context),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwt.verifyAsync).not.toHaveBeenCalled();
  });

  it('refuse un JWT dont la signature est invalide', async () => {
    const { guard, context, jwt, prisma } = setup();

    jwt.verifyAsync.mockRejectedValue(
      new Error('Invalid signature'),
    );

    await expect(
      guard.canActivate(context),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(
      prisma.refreshSession.findFirst,
    ).not.toHaveBeenCalled();
  });
});
