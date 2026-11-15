
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ProvincialMembersService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  private readonly publicFields = {
    id: true,
    fullName: true,
    email: true,
    role: true,
    provinceId: true,
    isActive: true,
    emailVerifiedAt: true,
    createdAt: true,
  } as const;

  async findMembers(provinceId: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'MEMBRE',
        provinceId,
      },
      select: this.publicFields,
      orderBy: {
        createdAt: 'desc',
      },
      take: 50,
    });
  }

  async findPending(provinceId: string) {
    return this.prisma.user.findMany({
      where: {
        role: 'MEMBRE',
        provinceId,
        isActive: false,
        emailVerifiedAt: {
          not: null,
        },
      },
      select: this.publicFields,
      orderBy: {
        createdAt: 'asc',
      },
      take: 50,
    });
  }
}
