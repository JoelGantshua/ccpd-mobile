import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { AdminGuard } from '../auth/admin.guard.js';

import {
  EditorialImagesService,
} from './editorial-images.service.js';

import {
  AdminEditorialImagesController,
  PublicEditorialImagesController,
} from './editorial-images.controller.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
  ],
  controllers: [
    AdminEditorialImagesController,
    PublicEditorialImagesController,
  ],
  providers: [
    EditorialImagesService,
    AdminGuard,
  ],
})
export class EditorialImagesModule {}