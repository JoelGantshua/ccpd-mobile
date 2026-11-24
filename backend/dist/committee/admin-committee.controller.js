var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Patch, Body, Param, Query, ParseUUIDPipe, UseGuards, NotFoundException, BadRequestException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { SaveCommitteeMemberDto } from './dto/save-committee-member.dto.js';
let AdminCommitteeController = class AdminCommitteeController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(pageInput = '1') {
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
    async findOne(id) {
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
    async validateProvince(provinceId) {
        if (!provinceId)
            return;
        const province = await this.prisma.province.findUnique({
            where: { id: provinceId },
            select: { id: true },
        });
        if (!province) {
            throw new BadRequestException('Province introuvable.');
        }
    }
    async create(dto) {
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
    async update(id, dto) {
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
            throw new ConflictException('Seul un brouillon peut etre modifie.');
        }
        return this.findOne(id);
    }
    async publish(id) {
        const result = await this.prisma.committeeMember.updateMany({
            where: { id, status: 'DRAFT' },
            data: {
                status: 'PUBLISHED',
                publishedAt: new Date(),
            },
        });
        if (result.count !== 1) {
            throw new ConflictException('Publication impossible.');
        }
        return this.findOne(id);
    }
    async archive(id) {
        const result = await this.prisma.committeeMember.updateMany({
            where: {
                id,
                status: { in: ['DRAFT', 'PUBLISHED'] },
            },
            data: { status: 'ARCHIVED' },
        });
        if (result.count !== 1) {
            throw new ConflictException('Archivage impossible.');
        }
        return this.findOne(id);
    }
    async restoreDraft(id) {
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
            throw new ConflictException('Remise en brouillon impossible.');
        }
        return this.findOne(id);
    }
};
__decorate([
    Get(),
    __param(0, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveCommitteeMemberDto]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SaveCommitteeMemberDto]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "update", null);
__decorate([
    Patch(':id/publish'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "publish", null);
__decorate([
    Patch(':id/archive'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "archive", null);
__decorate([
    Patch(':id/draft'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminCommitteeController.prototype, "restoreDraft", null);
AdminCommitteeController = __decorate([
    Controller('admin/committee'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [PrismaService])
], AdminCommitteeController);
export { AdminCommitteeController };
//# sourceMappingURL=admin-committee.controller.js.map