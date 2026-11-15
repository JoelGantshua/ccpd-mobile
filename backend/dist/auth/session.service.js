var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { createHash, randomBytes } from 'node:crypto';
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;
function createRefreshToken() {
    return randomBytes(32).toString('hex');
}
function hashRefreshToken(token) {
    return createHash('sha256').update(token).digest('hex');
}
function validToken(token) {
    return (typeof token === 'string' &&
        /^[a-f0-9]{64}$/.test(token));
}
let SessionService = class SessionService {
    prisma;
    jwtService;
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async createSession(userId) {
        const refreshToken = createRefreshToken();
        const session = await this.prisma.refreshSession.create({
            data: {
                userId,
                tokenHash: hashRefreshToken(refreshToken),
                expiresAt: new Date(Date.now() + SESSION_DURATION_MS),
            },
            select: {
                id: true,
            },
        });
        const accessToken = await this.jwtService.signAsync({
            sub: userId,
            typ: 'access',
            sid: session.id,
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    async refresh(refreshToken) {
        if (!validToken(refreshToken)) {
            throw new UnauthorizedException('Session invalide ou expiree');
        }
        const tokenHash = hashRefreshToken(refreshToken);
        const session = await this.prisma.refreshSession.findUnique({
            where: { tokenHash },
            select: {
                id: true,
                userId: true,
            },
        });
        if (!session) {
            throw new UnauthorizedException('Session invalide ou expiree');
        }
        const user = await this.prisma.user.findUnique({
            where: { id: session.userId },
            select: {
                id: true,
                isActive: true,
                emailVerifiedAt: true,
            },
        });
        if (!user?.isActive || !user.emailVerifiedAt) {
            throw new UnauthorizedException('Session invalide ou expiree');
        }
        const newRefreshToken = createRefreshToken();
        const newTokenHash = hashRefreshToken(newRefreshToken);
        const updated = await this.prisma.refreshSession.updateMany({
            where: {
                id: session.id,
                tokenHash,
                revokedAt: null,
                expiresAt: { gt: new Date() },
                user: {
                    is: {
                        isActive: true,
                        emailVerifiedAt: { not: null },
                    },
                },
            },
            data: {
                tokenHash: newTokenHash,
                lastUsedAt: new Date(),
            },
        });
        if (updated.count !== 1) {
            throw new UnauthorizedException('Session invalide ou expiree');
        }
        const accessToken = await this.jwtService.signAsync({
            sub: user.id,
            typ: 'access',
            sid: session.id,
        });
        return {
            accessToken,
            refreshToken: newRefreshToken,
            tokenType: 'Bearer',
            expiresIn: 900,
        };
    }
    async logout(userId, refreshToken) {
        if (!validToken(refreshToken)) {
            throw new UnauthorizedException();
        }
        await this.prisma.refreshSession.updateMany({
            where: {
                userId,
                tokenHash: hashRefreshToken(refreshToken),
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        });
        return { success: true };
    }
    async logoutAll(userId) {
        await this.prisma.refreshSession.updateMany({
            where: {
                userId,
                revokedAt: null,
            },
            data: {
                revokedAt: new Date(),
            },
        });
        return { success: true };
    }
};
SessionService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService])
], SessionService);
export { SessionService };
//# sourceMappingURL=session.service.js.map