import {
  Controller,
  Get,
  Post,
  Param,
  ParseUUIDPipe,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Header,
  BadRequestException,
} from '@nestjs/common';

import { FileInterceptor } from '@nestjs/platform-express';

import { JwtAccessGuard } from '../auth/jwt-access.guard.js';
import { AdminGuard } from '../auth/admin.guard.js';

import {
  EditorialImagesService,
} from './editorial-images.service.js';

import type {
  ImageKind,
} from './editorial-images.service.js';

function validateKind(value: string): ImageKind {
  if (value !== 'committee' && value !== 'articles') {
    throw new BadRequestException('Rubrique invalide.');
  }

  return value;
}

const uploadOptions = {
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
    fields: 0,
    parts: 1,
  },
};

@Controller('admin')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminEditorialImagesController {
  constructor(
    private readonly images: EditorialImagesService,
  ) {}

  @Post(':kind/:id/image')
  @UseInterceptors(FileInterceptor('image', uploadOptions))
  upload(
    @Param('kind') kind: string,
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.images.upload(
      validateKind(kind),
      id,
      file,
    );
  }

  @Get(':kind/:id/image')
  @Header('Cache-Control', 'private, no-store')
  @Header('X-Content-Type-Options', 'nosniff')
  async preview(
    @Param('kind') kind: string,
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const buffer = await this.images.getImage(
      validateKind(kind),
      id,
      false,
    );

    return new StreamableFile(buffer, {
      type: 'image/webp',
      length: buffer.length,
    });
  }
}

@Controller()
export class PublicEditorialImagesController {
  constructor(
    private readonly images: EditorialImagesService,
  ) {}

  @Get('committee/:id/image')
  @Header('Cache-Control', 'no-store')
  @Header('X-Content-Type-Options', 'nosniff')
  async committeeImage(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const buffer = await this.images.getImage(
      'committee',
      id,
      true,
    );

    return new StreamableFile(buffer, {
      type: 'image/webp',
      length: buffer.length,
    });
  }

  @Get('articles/:id/image')
  @Header('Cache-Control', 'no-store')
  @Header('X-Content-Type-Options', 'nosniff')
  async articleImage(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    const buffer = await this.images.getImage(
      'articles',
      id,
      true,
    );

    return new StreamableFile(buffer, {
      type: 'image/webp',
      length: buffer.length,
    });
  }
}