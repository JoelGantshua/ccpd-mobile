var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AvisService = class AvisService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const content = dto.content?.trim();
        const authorName = dto.authorName?.trim();
        if (!content || content.length < 20 || content.length > 2000) {
            throw new BadRequestException('La contribution doit contenir entre 20 et 2000 caractères.');
        }
        if (!dto.isAnonymous &&
            (!authorName || authorName.length < 2 || authorName.length > 120)) {
            throw new BadRequestException('Le nom complet est obligatoire pour un avis non anonyme.');
        }
        const opinion = await this.prisma.opinion.create({
            data: {
                content,
                authorName: dto.isAnonymous ? null : authorName,
                isAnonymous: dto.isAnonymous,
                status: 'PENDING',
            },
            select: {
                id: true,
                status: true,
                createdAt: true,
            },
        });
        return {
            success: true,
            message: 'Votre avis a été reçu et attend validation.',
            opinion,
        };
    }
};
AvisService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AvisService);
export { AvisService };
//# sourceMappingURL=avis.service.js.map