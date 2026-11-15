import { describe, it, expect, vi } from 'vitest';
import { BadRequestException } from '@nestjs/common';
import { UsersService } from './users.service.js';
import type { PrismaService } from '../prisma/prisma.service.js';

describe('UsersService - Sécurité CCPD Bloc Est', () => {
  function setup(provinceName = 'Tshopo') {
    const prisma = {
      province: {
        findUnique: vi.fn().mockResolvedValue({
          id: 'province-test',
          name: provinceName,
        }),
      },
      user: {
        create: vi.fn().mockResolvedValue({
          id: 'user-test',
          fullName: 'Membre Test',
          email: 'membre@example.com',
          role: 'MEMBRE',
          provinceId: 'province-test',
          isActive: false,
        }),
      },
    };

    const service = new UsersService(
      prisma as unknown as PrismaService,
    );

    const data = {
      fullName: 'Membre Test',
      email: 'MEMBRE@example.com',
      provinceId: 'province-test',
      passwordHash: '$argon2id$v=19$test',
    };

    return { service, prisma, data };
  }

  it('impose le rôle MEMBRE et un compte inactif', async () => {
    const { service, prisma, data } = setup();

    await service.createMember(data);

    expect(prisma.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          role: 'MEMBRE',
          isActive: false,
          email: 'membre@example.com',
        }),
      }),
    );
  });

  it('ne retourne pas le hachage dans la réponse', async () => {
    const { service, prisma, data } = setup();

    const result = await service.createMember(data);

    expect(result).not.toHaveProperty('passwordHash');

    const argument = prisma.user.create.mock.calls[0][0];

    expect(argument.select.passwordHash).toBeUndefined();
  });

  it('refuse une province extérieure au Bloc Est', async () => {
    const { service, prisma, data } = setup('Kinshasa');

    await expect(
      service.createMember(data),
    ).rejects.toThrow(BadRequestException);

    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
