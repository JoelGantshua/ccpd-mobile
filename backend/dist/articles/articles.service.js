var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, NotFoundException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ArticlesService = class ArticlesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findPublished(categoryInput, pageInput = '1') {
        if (categoryInput !== 'POLITIQUE' &&
            categoryInput !== 'ECONOMIE') {
            throw new BadRequestException('Categorie invalide.');
        }
        if (typeof pageInput !== 'string' ||
            !/^[1-9]\d{0,4}$/.test(pageInput)) {
            throw new BadRequestException('Page invalide.');
        }
        const category = categoryInput;
        const page = Number(pageInput);
        const pageSize = 20;
        const where = {
            category,
            status: 'PUBLISHED',
        };
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
    async findPublishedById(id) {
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
};
ArticlesService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ArticlesService);
export { ArticlesService };
//# sourceMappingURL=articles.service.js.map