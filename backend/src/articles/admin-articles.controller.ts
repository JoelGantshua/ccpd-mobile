import {
  Controller,
  Get,
  Post,
  Patch,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
  BadRequestException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { SaveArticleDto } from './dto/save-article.dto.js';

@Controller('admin/articles')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminArticlesController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('page') pageInput = '1',
  ) {
    if (
      category !== 'POLITIQUE' &&
      category !== 'ECONOMIE'
    ) {
      throw new BadRequestException('Categorie invalide.');
    }

    if (!/^[1-9]\d{0,4}$/.test(pageInput)) {
      throw new BadRequestException('Page invalide.');
    }

    const page = Number(pageInput);
    const pageSize = 20;
    const where = { category } as const;

    const [total, items] = await Promise.all([
      this.prisma.article.count({ where }),
      this.prisma.article.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          { updatedAt: 'desc' },
          { id: 'asc' },
        ],
        select: {
          id: true,
          title: true,
          summary: true,
          category: true,
          status: true,
          coverImageKey: true,
          createdAt: true,
          updatedAt: true,
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

  @Get(':id')
  async findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const article = await this.prisma.article.findUnique({
      where: { id },
    });

    if (!article) {
      throw new NotFoundException('Article introuvable.');
    }

    return { success: true, article };
  }

  @Post()
  async create(@Body() dto: SaveArticleDto) {
    const article = await this.prisma.article.create({
      data: {
        title: dto.title,
        summary: dto.summary,
        content: dto.content,
        category: dto.category,
        status: 'DRAFT',
      },
    });

    return { success: true, article };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() dto: SaveArticleDto,
  ) {
    const result = await this.prisma.article.updateMany({
      where: { id, status: 'DRAFT' },
      data: {
        title: dto.title,
        summary: dto.summary,
        content: dto.content,
        category: dto.category,
      },
    });

    if (result.count !== 1) {
      throw new ConflictException(
        'Seul un brouillon peut etre modifie.',
      );
    }

    return this.findOne(id);
  }

  @Patch(':id/publish')
  async publish(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const result = await this.prisma.article.updateMany({
      where: { id, status: 'DRAFT' },
      data: {
        status: 'PUBLISHED',
        publishedAt: new Date(),
      },
    });

    if (result.count !== 1) {
      throw new ConflictException(
        'Publication impossible.',
      );
    }

    return this.findOne(id);
  }

  @Patch(':id/archive')
  async archive(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const result = await this.prisma.article.updateMany({
      where: {
        id,
        status: { in: ['DRAFT', 'PUBLISHED'] },
      },
      data: { status: 'ARCHIVED' },
    });

    if (result.count !== 1) {
      throw new ConflictException(
        'Archivage impossible.',
      );
    }

    return this.findOne(id);
  }

  @Patch(':id/draft')
  async restoreDraft(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const result = await this.prisma.article.updateMany({
      where: {
        id,
        status: { in: ['PUBLISHED', 'ARCHIVED'] },
      },
      data: {
        status: 'DRAFT',
        publishedAt: null,
      },
    });

    if (result.count !== 1) {
      throw new ConflictException(
        'Remise en brouillon impossible.',
      );
    }

    return this.findOne(id);
  }
}