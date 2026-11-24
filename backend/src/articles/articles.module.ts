import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminGuard } from '../auth/admin.guard.js';

import { ArticlesController } from './articles.controller.js';
import { AdminArticlesController } from './admin-articles.controller.js';
import { ArticlesService } from './articles.service.js';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [
    ArticlesController,
    AdminArticlesController,
  ],
  providers: [
    ArticlesService,
    AdminGuard,
  ],
  exports: [ArticlesService],
})
export class ArticlesModule {}