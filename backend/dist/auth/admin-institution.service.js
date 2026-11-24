var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let AdminInstitutionService = class AdminInstitutionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    filters(provinceId, page) {
        if (provinceId && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(provinceId)) {
            throw new BadRequestException('Province invalide.');
        }
        if (page !== undefined && (typeof page !== 'string' || !/^[1-9]\d{0,4}$/.test(page))) {
            throw new BadRequestException('Page invalide.');
        }
        const current = Number(page ?? 1);
        return {
            where: provinceId ? { provinceId } : {},
            page: current,
            take: 50,
            skip: (current - 1) * 50,
        };
    }
    result(items, total, page) {
        return {
            success: true,
            items,
            pagination: {
                page,
                pageSize: 50,
                total,
                totalPages: Math.ceil(total / 50),
            },
        };
    }
    async members(provinceId, page) {
        const f = this.filters(provinceId, page);
        const where = { ...f.where, role: 'MEMBRE' };
        const [items, total] = await Promise.all([
            this.prisma.user.findMany({
                where,
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    isActive: true,
                    emailVerifiedAt: true,
                    createdAt: true,
                    province: { select: { id: true, name: true } },
                },
                orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
                skip: f.skip,
                take: f.take,
            }),
            this.prisma.user.count({ where }),
        ]);
        return this.result(items, total, f.page);
    }
    async opinions(provinceId, page) {
        const f = this.filters(provinceId, page);
        const [items, total] = await Promise.all([
            this.prisma.opinion.findMany({
                where: f.where,
                select: {
                    id: true,
                    authorName: true,
                    isAnonymous: true,
                    content: true,
                    status: true,
                    createdAt: true,
                    province: { select: { id: true, name: true } },
                    publication: {
                        select: {
                            id: true,
                            title: true,
                            type: true,
                            doctrineNumber: true,
                            doctrineVersion: true,
                        },
                    },
                },
                orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
                skip: f.skip,
                take: f.take,
            }),
            this.prisma.opinion.count({ where: f.where }),
        ]);
        return this.result(items.map(item => ({
            ...item,
            authorName: item.isAnonymous ? null : item.authorName,
        })), total, f.page);
    }
    async participations(provinceId, page) {
        const f = this.filters(provinceId, page);
        const [items, total] = await Promise.all([
            this.prisma.participation.findMany({
                where: f.where,
                select: {
                    id: true,
                    fullName: true,
                    email: true,
                    phone: true,
                    motivation: true,
                    status: true,
                    emailVerifiedAt: true,
                    createdAt: true,
                    province: { select: { id: true, name: true } },
                },
                orderBy: [{ createdAt: 'desc' }, { id: 'asc' }],
                skip: f.skip,
                take: f.take,
            }),
            this.prisma.participation.count({ where: f.where }),
        ]);
        return this.result(items, total, f.page);
    }
    async moderateOpinion(id, status) {
        const result = await this.prisma.opinion.updateMany({
            where: { id, status: 'PENDING' },
            data: { status },
        });
        if (result.count !== 1) {
            throw new ConflictException('Avis introuvable ou deja traite.');
        }
        return { success: true, id, status };
    }
    async moderateParticipation(id, status) {
        const result = await this.prisma.participation.updateMany({
            where: { id, status: 'PENDING' },
            data: { status },
        });
        if (result.count !== 1) {
            throw new ConflictException('Participation introuvable ou deja traitee.');
        }
        return { success: true, id, status };
    }
    async statistics() {
        const [provinces, members, opinions, participations] = await Promise.all([
            this.prisma.province.findMany({
                select: { id: true, name: true },
                orderBy: { name: 'asc' },
            }),
            this.prisma.user.groupBy({
                by: ['provinceId', 'isActive', 'emailVerifiedAt'],
                where: { role: 'MEMBRE' },
                _count: { _all: true },
            }),
            this.prisma.opinion.groupBy({
                by: ['provinceId', 'status'],
                _count: { _all: true },
            }),
            this.prisma.participation.groupBy({
                by: ['provinceId', 'status'],
                _count: { _all: true },
            }),
        ]);
        const sum = (rows) => rows.reduce((total, row) => total + row._count._all, 0);
        function summarize(provinceId) {
            const m = members.filter(x => provinceId === undefined || x.provinceId === provinceId);
            const o = opinions.filter(x => provinceId === undefined || x.provinceId === provinceId);
            const p = participations.filter(x => provinceId === undefined || x.provinceId === provinceId);
            return {
                members: sum(m),
                activeMembers: sum(m.filter(x => x.isActive && x.emailVerifiedAt !== null)),
                pendingMembers: sum(m.filter(x => !x.isActive && x.emailVerifiedAt !== null)),
                unverifiedMembers: sum(m.filter(x => x.emailVerifiedAt === null)),
                opinions: sum(o),
                pendingOpinions: sum(o.filter(x => x.status === 'PENDING')),
                approvedOpinions: sum(o.filter(x => x.status === 'APPROVED')),
                rejectedOpinions: sum(o.filter(x => x.status === 'REJECTED')),
                participations: sum(p),
                pendingParticipations: sum(p.filter(x => x.status === 'PENDING')),
                approvedParticipations: sum(p.filter(x => x.status === 'APPROVED')),
                rejectedParticipations: sum(p.filter(x => x.status === 'REJECTED')),
            };
        }
        return {
            success: true,
            global: summarize(),
            provinces: provinces.map(province => ({
                ...province,
                ...summarize(province.id),
            })),
            unassigned: summarize(null),
        };
    }
};
AdminInstitutionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], AdminInstitutionService);
export { AdminInstitutionService };
//# sourceMappingURL=admin-institution.service.js.map