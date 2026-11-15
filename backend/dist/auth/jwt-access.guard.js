var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
let JwtAccessGuard = class JwtAccessGuard {
    jwtService;
    prisma;
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers.authorization;
        if (typeof authorization !== 'string' ||
            !/^Bearer \S+$/i.test(authorization)) {
            throw new UnauthorizedException();
        }
        const token = authorization.slice(7);
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(token, {
                algorithms: ['HS256'],
                issuer: 'ccpd-mobile-api',
                audience: 'ccpd-mobile',
            });
        }
        catch {
            throw new UnauthorizedException();
        }
        const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        if (payload.typ !== 'access' ||
            typeof payload.sub !== 'string' ||
            typeof payload.sid !== 'string' ||
            !uuidPattern.test(payload.sub) ||
            !uuidPattern.test(payload.sid)) {
            throw new UnauthorizedException();
        }
        const session = await this.prisma.refreshSession.findFirst({
            where: {
                id: payload.sid,
                userId: payload.sub,
                revokedAt: null,
                expiresAt: {
                    gt: new Date(),
                },
            },
            select: {
                id: true,
            },
        });
        if (!session) {
            throw new UnauthorizedException();
        }
        const user = await this.prisma.user.findUnique({
            where: {
                id: payload.sub,
            },
            select: {
                id: true,
                fullName: true,
                role: true,
                provinceId: true,
                isActive: true,
                emailVerifiedAt: true,
            },
        });
        if (!user ||
            !user.isActive ||
            !user.emailVerifiedAt) {
            throw new UnauthorizedException();
        }
        request.user = {
            id: user.id,
            fullName: user.fullName,
            role: user.role,
            provinceId: user.provinceId,
        };
        return true;
    }
};
JwtAccessGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService,
        PrismaService])
], JwtAccessGuard);
export { JwtAccessGuard };
//# sourceMappingURL=jwt-access.guard.js.map