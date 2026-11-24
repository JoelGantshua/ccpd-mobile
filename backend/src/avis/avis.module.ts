import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AvisController } from './avis.controller.js';
import { AvisService } from './avis.service.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AvisController],
  providers: [AvisService],
})
export class AvisModule {}