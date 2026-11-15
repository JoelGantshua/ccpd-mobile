
import { describe, expect, it, vi } from 'vitest';
import { UnauthorizedException } from '@nestjs/common';
import { createHash } from 'node:crypto';

import { SessionService } from './session.service.js';
import type { PrismaService } from '../prisma/prisma.service.js';
import type { JwtService } from '@nestjs/jwt';

describe('SessionService - CCPD Mobile', () => {
  const userId = '123e4567-e89b-42d3-a456-426614174000';
  const oldToken = 'a'.repeat(64);

  const hash = (value: string) =>
    createHash('sha256').update(value).digest('hex');

  function setup() {
    const prisma = {
      refreshSession: {
        create: vi.fn().mockResolvedValue({ id: 'session-test' }),
        findUnique: vi.fn().mockResolvedValue({
          id: 'session-test',
          userId,
        }),
        updateMany: vi.fn().mockResolvedValue({ count: 1 }),
      },
      user: {
        findUnique: vi.fn().mockResolvedValue({
          id: userId,
          isActive: true,
          emailVerifiedAt: new Date(),
        }),
      },
    };

    const jwt = {
      signAsync: vi.fn().mockResolvedValue('access-jwt-test'),
    };

    const service = new SessionService(
      prisma as unknown as PrismaService,
      jwt as unknown as JwtService,
    );

    return { service, prisma, jwt };
  }

  it('cree une session avec un refresh token hache', async () => {
    const { service, prisma } = setup();

    const result = await service.createSession(userId);

    expect(result.refreshToken).toMatch(/^[a-f0-9]{64}$/);

    const data =
      prisma.refreshSession.create.mock.calls[0][0].data;

    expect(data.userId).toBe(userId);
    expect(data.tokenHash).toBe(hash(result.refreshToken));
    expect(data.tokenHash).not.toBe(result.refreshToken);
    expect(data.expiresAt).toBeInstanceOf(Date);
  });

  it('refuse un refresh token mal forme', async () => {
    const { service, prisma } = setup();

    await expect(
      service.refresh('invalide'),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(
      prisma.refreshSession.findUnique,
    ).not.toHaveBeenCalled();
  });

  it('refuse une session inexistante', async () => {
    const { service, prisma } = setup();

    prisma.refreshSession.findUnique.mockResolvedValue(null);

    await expect(
      service.refresh(oldToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('refuse un compte desactive', async () => {
    const { service, prisma, jwt } = setup();

    prisma.user.findUnique.mockResolvedValue({
      id: userId,
      isActive: false,
      emailVerifiedAt: new Date(),
    });

    await expect(
      service.refresh(oldToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('refuse un compte sans email verifie', async () => {
    const { service, prisma, jwt } = setup();

    prisma.user.findUnique.mockResolvedValue({
      id: userId,
      isActive: true,
      emailVerifiedAt: null,
    });

    await expect(
      service.refresh(oldToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('effectue la rotation du refresh token', async () => {
    const { service, prisma, jwt } = setup();

    const result = await service.refresh(oldToken);

    expect(result.accessToken).toBe('access-jwt-test');
    expect(result.refreshToken).toMatch(/^[a-f0-9]{64}$/);
    expect(result.refreshToken).not.toBe(oldToken);
    expect(result.expiresIn).toBe(900);

    expect(
      prisma.refreshSession.updateMany,
    ).toHaveBeenCalledTimes(1);

    const update =
      prisma.refreshSession.updateMany.mock.calls[0][0];

    expect(update.where.tokenHash).toBe(hash(oldToken));
    expect(update.where.revokedAt).toBeNull();
    expect(update.data.tokenHash).toBe(
      hash(result.refreshToken),
    );

    expect(jwt.signAsync).toHaveBeenCalledWith({
      sub: userId,
      typ: 'access',
      sid: 'session-test',
    });
  });

  it('refuse une rotation concurrente perdante', async () => {
    const { service, prisma, jwt } = setup();

    prisma.refreshSession.updateMany.mockResolvedValue({
      count: 0,
    });

    await expect(
      service.refresh(oldToken),
    ).rejects.toBeInstanceOf(UnauthorizedException);

    expect(jwt.signAsync).not.toHaveBeenCalled();
  });

  it('revoque une session lors de la deconnexion', async () => {
    const { service, prisma } = setup();

    const result = await service.logout(userId, oldToken);

    expect(result).toEqual({ success: true });

    const update =
      prisma.refreshSession.updateMany.mock.calls[0][0];

    expect(update.where.userId).toBe(userId);
    expect(update.where.tokenHash).toBe(hash(oldToken));
    expect(update.where.revokedAt).toBeNull();
    expect(update.data.revokedAt).toBeInstanceOf(Date);
  });

  it('revoque toutes les sessions du compte', async () => {
    const { service, prisma } = setup();

    const result = await service.logoutAll(userId);

    expect(result).toEqual({ success: true });

    const update =
      prisma.refreshSession.updateMany.mock.calls[0][0];

    expect(update.where.userId).toBe(userId);
    expect(update.where.revokedAt).toBeNull();
    expect(update.data.revokedAt).toBeInstanceOf(Date);
  });
});
