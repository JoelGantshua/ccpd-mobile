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
import { Controller, Get, Post, Patch, Body, Param, Query, ParseUUIDPipe, UseGuards, BadRequestException, NotFoundException, ConflictException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';
import { SaveArticleDto } from './dto/save-article.dto.js';
let AdminArticlesController = class AdminArticlesController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll(category, pageInput = '1') {
        if (category !== 'POLITIQUE' &&
            category !== 'ECONOMIE') {
            throw new BadRequestException('Categorie invalide.');
        }
        if (!/^[1-9]\d{0,4}$/.test(pageInput)) {
            throw new BadRequestException('Page invalide.');
        }
        const page = Number(pageInput);
        const pageSize = 20;
        const where = { category };
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
    async findOne(id) {
        const article = await this.prisma.article.findUnique({
            where: { id },
        });
        if (!article) {
            throw new NotFoundException('Article introuvable.');
        }
        return { success: true, article };
    }
    async create(dto) {
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
    async update(id, dto) {
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
            throw new ConflictException('Seul un brouillon peut etre modifie.');
        }
        return this.findOne(id);
    }
    async publish(id) {
        const result = await this.prisma.article.updateMany({
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
        const result = await this.prisma.article.updateMany({
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
            throw new ConflictException('Remise en brouillon impossible.');
        }
        return this.findOne(id);
    }
};
__decorate([
    Get(),
    __param(0, Query('category')),
    __param(1, Query('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "findAll", null);
__decorate([
    Get(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "findOne", null);
__decorate([
    Post(),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SaveArticleDto]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "create", null);
__decorate([
    Patch(':id'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, SaveArticleDto]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "update", null);
__decorate([
    Patch(':id/publish'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "publish", null);
__decorate([
    Patch(':id/archive'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "archive", null);
__decorate([
    Patch(':id/draft'),
    __param(0, Param('id', new ParseUUIDPipe({ version: '4' }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AdminArticlesController.prototype, "restoreDraft", null);
AdminArticlesController = __decorate([
    Controller('admin/articles'),
    UseGuards(JwtAccessGuard, AdminGuard),
    __metadata("design:paramtypes", [PrismaService])
], AdminArticlesController);
export { AdminArticlesController };
//# sourceMappingURL=admin-articles.controller.js.map