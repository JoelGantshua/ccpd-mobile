import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AvisController } from './avis.controller.js';
import { AvisService } from './avis.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [AvisController],
  providers: [AvisService],
})
export class AvisModule {}
