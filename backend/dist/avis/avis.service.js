var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, ForbiddenException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AvisService = class AvisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto, user) {
        if (!user.provinceId) {
            throw new ForbiddenException('Votre compte doit etre rattache a une province.');
        }
        const content = dto.content.trim();
        if (content.length < 20 || content.length > 2000) {
            throw new BadRequestException('La contribution doit contenir entre 20 et 2000 caracteres.');
        }
        const publication = await this.prisma.publication.findFirst({
            where: {
                id: dto.publicationId,
                status: 'PUBLISHED',
            },
            select: {
                id: true,
                title: true,
                type: true,
                doctrineNumber: true,
                doctrineVersion: true,
            },
        });
        if (!publication) {
            throw new BadRequestException('La publication selectionnee est indisponible.');
        }
        const opinion = await this.prisma.opinion.create({
            data: {
                content,
                publicationId: publication.id,
                isAnonymous: dto.isAnonymous,
                authorName: dto.isAnonymous ? null : user.fullName,
                authorId: dto.isAnonymous ? null : user.id,
                provinceId: user.provinceId,
                status: 'PENDING',
            },
            select: {
                id: true,
                publicationId: true,
                status: true,
                createdAt: true,
            },
        });
        return {
            success: true,
            message: 'Votre avis a ete recu et attend validation.',
            opinion,
            publication,
        };
    }
};
AvisService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AvisService);
export { AvisService };
//# sourceMappingURL=avis.service.js.map