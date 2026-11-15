
import { describe, expect, it, vi } from 'vitest';
import { BadRequestException } from '@nestjs/common';

import { AdminMembersService } from './admin-members.service.js';
import type { PrismaService } from '../prisma/prisma.service.js';

describe('AdminMembersService', () => {
  function setup(count = 1) {
    const prisma = {
      user: {
        findMany: vi.fn().mockResolvedValue([]),
        updateMany: vi.fn().mockResolvedValue({ count }),
        findUniqueOrThrow: vi.fn().mockResolvedValue({
          id: 'user-test',
          isActive: true,
          role: 'MEMBRE',
        }),
      },
    };

    const service = new AdminMembersService(
      prisma as unknown as PrismaService,
    );

    return { service, prisma };
  }

  it('liste uniquement les membres vérifiés en attente', async () => {
    const { service, prisma } = setup();

    await service.findPending();

    const query = prisma.user.findMany.mock.calls[0][0];

    expect(query.where.role).toBe('MEMBRE');
    expect(query.where.isActive).toBe(false);
    expect(query.where.emailVerifiedAt).toEqual({
      not: null,
    });
    expect(query.select.passwordHash).toBeUndefined();
  });

  it('active un membre autorisé', async () => {
    const { service, prisma } = setup();

    const result = await service.approveMember('user-test');

    expect(result.isActive).toBe(true);

    const query = prisma.user.updateMany.mock.calls[0][0];

    expect(query.where.role).toBe('MEMBRE');
    expect(query.where.emailVerifiedAt).toEqual({
      not: null,
    });
    expect(query.data.isActive).toBe(true);
  });

  it('refuse une approbation non autorisée par les conditions SQL', async () => {
    const { service } = setup(0);

    await expect(
      service.approveMember('user-test'),
    ).rejects.toBeInstanceOf(BadRequestException);
  });
});
