var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, ConflictException, } from '@nestjs/common';
import { Prisma } from '../generated/prisma/client.js';
import { PrismaService } from '../prisma/prisma.service.js';
let UsersService = class UsersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findForAuthentication(email) {
        return this.prisma.user.findUnique({
            where: {
                email: email.trim().toLowerCase(),
            },
        });
    }
    async findPublicProfile(id) {
        return this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                fullName: true,
                role: true,
                provinceId: true,
                isActive: true,
            },
        });
    }
    async createMember(data) {
        const fullName = data.fullName.trim();
        const email = data.email.trim().toLowerCase();
        if (fullName.length < 2 || fullName.length > 150) {
            throw new BadRequestException('Nom invalide');
        }
        if (email.length > 254 ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            throw new BadRequestException('Email invalide');
        }
        const provincesAutorisees = [
            'Bas-Uele',
            'Haut-Uele',
            'Ituri',
            'Maniema',
            'Nord-Kivu',
            'Sud-Kivu',
            'Tanganyika',
            'Tshopo',
        ];
        const province = await this.prisma.province.findUnique({
            where: { id: data.provinceId },
        });
        if (!province ||
            !provincesAutorisees.includes(province.name)) {
            throw new BadRequestException('Province non autorisée');
        }
        if (typeof data.passwordHash !== 'string' ||
            !data.passwordHash.startsWith('$argon2id$')) {
            throw new BadRequestException('Hachage du mot de passe invalide');
        }
        try {
            return await this.prisma.user.create({
                data: {
                    fullName,
                    email,
                    passwordHash: data.passwordHash,
                    provinceId: province.id,
                    role: 'MEMBRE',
                    isActive: false,
                },
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    role: true,
                    provinceId: true,
                    isActive: true,
                    createdAt: true,
                },
            });
        }
        catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError &&
                error.code === 'P2002') {
                throw new ConflictException('Impossible de créer ce compte');
            }
            throw error;
        }
    }
};
UsersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UsersService);
export { UsersService };
//# sourceMappingURL=users.service.js.map