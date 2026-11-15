
import { createHash, randomBytes } from 'node:crypto';

import {
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service.js';

const SESSION_DURATION_MS = 30 * 24 * 60 * 60 * 1000;

function createRefreshToken(): string {
  return randomBytes(32).toString('hex');
}

function hashRefreshToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

function validToken(token: unknown): token is string {
  return (
    typeof token === 'string' &&
    /^[a-f0-9]{64}$/.test(token)
  );
}

@Injectable()
export class SessionService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async createSession(userId: string) {
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

  async refresh(refreshToken: string) {
    if (!validToken(refreshToken)) {
      throw new UnauthorizedException(
        'Session invalide ou expiree',
      );
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
      throw new UnauthorizedException(
        'Session invalide ou expiree',
      );
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
      throw new UnauthorizedException(
        'Session invalide ou expiree',
      );
    }

    const newRefreshToken = createRefreshToken();
    const newTokenHash = hashRefreshToken(newRefreshToken);

    // Mise a jour conditionnelle atomique :
    // deux renouvellements simultanes ne peuvent
    // pas utiliser avec succes le meme jeton.
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
      throw new UnauthorizedException(
        'Session invalide ou expiree',
      );
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

  async logout(userId: string, refreshToken: string) {
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

  async logoutAll(userId: string) {
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
}
