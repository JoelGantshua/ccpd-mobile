import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class CommitteeService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished() {
    const items = await this.prisma.committeeMember.findMany({
      where: {
        status: 'PUBLISHED',
      },
      orderBy: [
        { displayOrder: 'asc' },
        { fullName: 'asc' },
        { id: 'asc' },
      ],
      select: {
        id: true,
        fullName: true,
        position: true,
        biography: true,
        photoKey: true,
        displayOrder: true,
        publishedAt: true,
        province: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      success: true,
      total: items.length,
      items,
    };
  }

  async findPublishedById(id: string) {
    const member = await this.prisma.committeeMember.findFirst({
      where: {
        id,
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        fullName: true,
        position: true,
        biography: true,
        photoKey: true,
        displayOrder: true,
        publishedAt: true,
        province: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Membre introuvable.');
    }

    return {
      success: true,
      member,
    };
  }
}