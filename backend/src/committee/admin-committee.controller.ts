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
  NotFoundException,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { SaveCommitteeMemberDto } from './dto/save-committee-member.dto.js';

@Controller('admin/committee')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminCommitteeController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  async findAll(@Query('page') pageInput = '1') {
    if (!/^[1-9]\d{0,4}$/.test(pageInput)) {
      throw new BadRequestException('Page invalide.');
    }

    const page = Number(pageInput);
    const pageSize = 50;

    const [total, items] = await Promise.all([
      this.prisma.committeeMember.count(),
      this.prisma.committeeMember.findMany({
        skip: (page - 1) * pageSize,
        take: pageSize,
        orderBy: [
          { displayOrder: 'asc' },
          { fullName: 'asc' },
          { id: 'asc' },
        ],
        include: {
          province: {
            select: { id: true, name: true },
          },
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
    const member = await this.prisma.committeeMember.findUnique({
      where: { id },
      include: {
        province: {
          select: { id: true, name: true },
        },
      },
    });

    if (!member) {
      throw new NotFoundException('Membre introuvable.');
    }

    return { success: true, member };
  }

  private async validateProvince(provinceId?: string | null) {
    if (!provinceId) return;

    const province = await this.prisma.province.findUnique({
      where: { id: provinceId },
      select: { id: true },
    });

    if (!province) {
      throw new BadRequestException('Province introuvable.');
    }
  }

  @Post()
  async create(@Body() dto: SaveCommitteeMemberDto) {
    await this.validateProvince(dto.provinceId);

    const member = await this.prisma.committeeMember.create({
      data: {
        fullName: dto.fullName,
        position: dto.position,
        biography: dto.biography?.trim() || null,
        provinceId: dto.provinceId || null,
        displayOrder: dto.displayOrder,
        status: 'DRAFT',
      },
    });

    return { success: true, member };
  }

  @Patch(':id')
  async update(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @Body() dto: SaveCommitteeMemberDto,
  ) {
    await this.validateProvince(dto.provinceId);

    const result = await this.prisma.committeeMember.updateMany({
      where: { id, status: 'DRAFT' },
      data: {
        fullName: dto.fullName,
        position: dto.position,
        biography: dto.biography?.trim() || null,
        provinceId: dto.provinceId || null,
        displayOrder: dto.displayOrder,
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
    const result = await this.prisma.committeeMember.updateMany({
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
    const result = await this.prisma.committeeMember.updateMany({
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
    const result = await this.prisma.committeeMember.updateMany({
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