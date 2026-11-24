import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { PrismaModule } from '../prisma/prisma.module.js';
import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { PublicationsController } from './publications.controller.js';
import { PublicationsService } from './publications.service.js';

@Module({
  imports: [
    PrismaModule,
    JwtModule.registerAsync({
      useFactory: () => {
        const secret = process.env.JWT_SECRET;

        if (
          !secret ||
          !/^[A-Za-z0-9+/]+={0,2}$/.test(secret) ||
          Buffer.from(secret, 'base64').length < 32
        ) {
          throw new Error('JWT_SECRET invalide');
        }

        return {
          secret,
          signOptions: {
            algorithm: 'HS256' as const,
            expiresIn: '15m' as const,
            issuer: 'ccpd-mobile-api',
            audience: 'ccpd-mobile',
          },
        };
      },
    }),
  ],
  controllers: [PublicationsController],
  providers: [
    PublicationsService,
    JwtAccessGuard,
  ],
  exports: [PublicationsService],
})
export class PublicationsModule {}
