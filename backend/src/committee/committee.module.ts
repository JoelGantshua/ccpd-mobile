import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminGuard } from '../auth/admin.guard.js';

import { CommitteeController } from './committee.controller.js';
import { AdminCommitteeController } from './admin-committee.controller.js';
import { CommitteeService } from './committee.service.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [
    CommitteeController,
    AdminCommitteeController,
  ],
  providers: [
    CommitteeService,
    AdminGuard,
  ],
  exports: [CommitteeService],
})
export class CommitteeModule {}