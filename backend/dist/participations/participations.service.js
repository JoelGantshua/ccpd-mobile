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
let ParticipationsService = class ParticipationsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const province = await this.prisma.province.findUnique({
            where: {
                name: dto.province,
            },
            select: {
                id: true,
            },
        });
        if (!province) {
            throw new BadRequestException('La province sélectionnée est invalide.');
        }
        const participation = await this.prisma.participation.create({
            data: {
                fullName: dto.fullName,
                email: dto.email,
                phone: dto.phone || null,
                motivation: dto.motivation,
                provinceId: province.id,
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
            message: 'Votre demande de participation a bien été reçue.',
            participation,
        };
    }
};
ParticipationsService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ParticipationsService);
export { ParticipationsService };
//# sourceMappingURL=participations.service.js.map