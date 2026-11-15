
import { describe, expect, it, vi } from 'vitest';
import { ForbiddenException } from '@nestjs/common';

import { ProvincialMembersController } from './provincial-members.controller.js';
import { ProvincialMembersService } from './provincial-members.service.js';

import type { PrismaService } from '../prisma/prisma.service.js';

describe('Autorisations provinciales CCPD', () => {
  const provinceId = '123e4567-e89b-42d3-a456-426614174000';

  function setup(role = 'RESPONSABLE_PROVINCIAL') {
    const prisma = {
      user: {
        findMany: vi.fn().mockResolvedValue([]),
      },
    };

    const service = new ProvincialMembersService(
      prisma as unknown as PrismaService,
    );

    const controller = new ProvincialMembersController(service);

    const request = {
      user: {
        id: 'responsable-test',
        role,
        provinceId: provinceId as string | null,
      },
    };

    return { controller, prisma, request };
  }

  it('autorise un responsable a consulter sa province', async () => {
    const { controller, prisma, request } = setup();

    await controller.members(request);

    const query = prisma.user.findMany.mock.calls[0][0];

    expect(query.where.provinceId).toBe(provinceId);
    expect(query.where.role).toBe('MEMBRE');
    expect(query.select.passwordHash).toBeUndefined();
  });

  it('refuse un membre ordinaire', async () => {
    const { controller, prisma, request } = setup('MEMBRE');

    await expect(
      controller.members(request),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.user.findMany).not.toHaveBeenCalled();
  });

  it('refuse un responsable sans province', async () => {
    const { controller, prisma, request } = setup();

    request.user.provinceId = null;

    await expect(
      controller.members(request),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.user.findMany).not.toHaveBeenCalled();
  });

  it('filtre les inscriptions en attente par province', async () => {
    const { controller, prisma, request } = setup();

    await controller.pending(request);

    const query = prisma.user.findMany.mock.calls[0][0];

    expect(query.where.provinceId).toBe(provinceId);
    expect(query.where.isActive).toBe(false);
    expect(query.where.emailVerifiedAt).toEqual({
      not: null,
    });
  });

  it('refuse aux administrateurs la route provinciale', async () => {
    const { controller, prisma, request } = setup('ADMIN');

    await expect(
      controller.members(request),
    ).rejects.toBeInstanceOf(ForbiddenException);

    expect(prisma.user.findMany).not.toHaveBeenCalled();
  });
});
