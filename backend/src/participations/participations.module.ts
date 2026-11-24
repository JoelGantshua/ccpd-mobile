import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { ParticipationsController } from './participations.controller.js';
import { ParticipationsService } from './participations.service.js';

@Module({
  imports: [PrismaModule],
  controllers: [ParticipationsController],
  providers: [ParticipationsService],
})
export class ParticipationsModule {}