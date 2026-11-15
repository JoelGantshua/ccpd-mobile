
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const request = context.switchToHttp().getRequest<{
      headers: { authorization?: string };
      user?: {
        id: string;
        fullName: string;
        role: string;
        provinceId: string | null;
      };
    }>();

    const authorization = request.headers.authorization;

    if (
      typeof authorization !== 'string' ||
      !/^Bearer \S+$/i.test(authorization)
    ) {
      throw new UnauthorizedException();
    }

    const token = authorization.slice(7);

    let payload: {
      sub?: unknown;
      sid?: unknown;
      typ?: unknown;
    };

    try {
      payload = await this.jwtService.verifyAsync(token, {
        algorithms: ['HS256'],
        issuer: 'ccpd-mobile-api',
        audience: 'ccpd-mobile',
      });
    } catch {
      throw new UnauthorizedException();
    }

    const uuidPattern =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

    if (
      payload.typ !== 'access' ||
      typeof payload.sub !== 'string' ||
      typeof payload.sid !== 'string' ||
      !uuidPattern.test(payload.sub) ||
      !uuidPattern.test(payload.sid)
    ) {
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

    if (
      !user ||
      !user.isActive ||
      !user.emailVerifiedAt
    ) {
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
}
