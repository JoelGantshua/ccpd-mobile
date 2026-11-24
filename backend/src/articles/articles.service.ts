import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async findPublished(
    categoryInput: unknown,
    pageInput: unknown = '1',
  ) {
    if (
      categoryInput !== 'POLITIQUE' &&
      categoryInput !== 'ECONOMIE'
    ) {
      throw new BadRequestException('Categorie invalide.');
    }

    if (
      typeof pageInput !== 'string' ||
      !/^[1-9]\d{0,4}$/.test(pageInput)
    ) {
      throw new BadRequestException('Page invalide.');
    }

    const category = categoryInput;
    const page = Number(pageInput);
    const pageSize = 20;

    const where = {
      category,
      status: 'PUBLISHED',
    } as const;

    const [total, items] = await Promise.all([
      this.prisma.article.count({ where }),

      this.prisma.article.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          { publishedAt: 'desc' },
          { id: 'asc' },
        ],
        select: {
          id: true,
          title: true,
          summary: true,
        coverImageKey: true,
          category: true,
          publishedAt: true,
        },
      }),
    ]);

    return {
      success: true,
      items,
      pagination: {
        page,
        pageSize,
        total,
        totalPages: Math.ceil(total / pageSize),
      },
    };
  }

  async findPublishedById(id: string) {
    const article = await this.prisma.article.findFirst({
      where: {
        id,
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        summary: true,
        coverImageKey: true,
        content: true,
        category: true,
        publishedAt: true,
      },
    });

    if (!article) {
      throw new NotFoundException('Article introuvable.');
    }

    return {
      success: true,
      article,
    };
  }
}