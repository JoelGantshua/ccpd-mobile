var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AdminMembersService = class AdminMembersService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    publicFields = {
        id: true,
        fullName: true,
        email: true,
        role: true,
        provinceId: true,
        isActive: true,
        emailVerifiedAt: true,
        createdAt: true,
    };
    async findPending() {
        return this.prisma.user.findMany({
            where: {
                role: 'MEMBRE',
                isActive: false,
                emailVerifiedAt: {
                    not: null,
                },
            },
            select: this.publicFields,
            orderBy: {
                createdAt: 'asc',
            },
            take: 100,
        });
    }
    async approveMember(id) {
        const result = await this.prisma.user.updateMany({
            where: {
                id,
                role: 'MEMBRE',
                isActive: false,
                emailVerifiedAt: {
                    not: null,
                },
            },
            data: {
                isActive: true,
            },
        });
        if (result.count !== 1) {
            throw new BadRequestException('Membre introuvable, non vérifié ou déjà activé');
        }
        return this.prisma.user.findUniqueOrThrow({
            where: { id },
            select: this.publicFields,
        });
    }
};
AdminMembersService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminMembersService);
export { AdminMembersService };
//# sourceMappingURL=admin-members.service.js.map