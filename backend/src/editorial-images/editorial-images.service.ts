import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

import { randomUUID } from 'node:crypto';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join } from 'node:path';

import sharp from 'sharp';

import { PrismaService } from '../prisma/prisma.service.js';

export type ImageKind = 'committee' | 'articles';

@Injectable()
export class EditorialImagesService {
  private readonly directory = join(
    process.cwd(),
    'uploads',
    'editorial',
  );

  constructor(private readonly prisma: PrismaService) {}

  private async processImage(
    file: Express.Multer.File,
    kind: ImageKind,
  ): Promise<Buffer> {
    if (
      !file?.buffer?.length ||
      file.buffer.length > 5 * 1024 * 1024
    ) {
      throw new BadRequestException(
        'Image obligatoire, maximum 5 Mo.',
      );
    }

    try {
      const image = sharp(file.buffer, {
        limitInputPixels: 25000000,
        failOn: 'error',
      });

      const metadata = await image.metadata();

      if (
        !metadata.format ||
        !['jpeg', 'png', 'webp'].includes(metadata.format) ||
        (metadata.pages ?? 1) > 1
      ) {
        throw new Error('Format non autorise');
      }

      return await image
        .rotate()
        .resize({
          width: kind === 'committee' ? 800 : 1600,
          height: kind === 'committee' ? 800 : 1000,
          fit: 'inside',
          withoutEnlargement: true,
        })
        .webp({ quality: 85 })
        .toBuffer();

    } catch {
      throw new BadRequestException(
        'Image invalide. Formats acceptes : JPEG, PNG, WebP.',
      );
    }
  }

  private async findRecord(kind: ImageKind, id: string) {
    if (kind === 'committee') {
      const member = await this.prisma.committeeMember.findUnique({
        where: { id },
        select: {
          id: true,
          status: true,
          photoKey: true,
        },
      });

      if (!member) {
        throw new NotFoundException('Membre introuvable.');
      }

      return {
        status: member.status,
        key: member.photoKey,
      };
    }

    const article = await this.prisma.article.findUnique({
      where: { id },
      select: {
        id: true,
        status: true,
        coverImageKey: true,
      },
    });

    if (!article) {
      throw new NotFoundException('Article introuvable.');
    }

    return {
      status: article.status,
      key: article.coverImageKey,
    };
  }

  async upload(
    kind: ImageKind,
    id: string,
    file: Express.Multer.File,
  ) {
    const record = await this.findRecord(kind, id);

    if (record.status !== 'DRAFT') {
      throw new ConflictException(
        'Seul un brouillon peut recevoir une image.',
      );
    }

    const buffer = await this.processImage(file, kind);
    const key = `${randomUUID()}.webp`;

    try {
      await mkdir(this.directory, { recursive: true });

      await writeFile(
        join(this.directory, key),
        buffer,
        { flag: 'wx' },
      );
    } catch {
      throw new InternalServerErrorException(
        'Impossible de stocker cette image.',
      );
    }

    const result = kind === 'committee'
      ? await this.prisma.committeeMember.updateMany({
          where: {
            id,
            status: 'DRAFT',
            photoKey: record.key,
          },
          data: { photoKey: key },
        })
      : await this.prisma.article.updateMany({
          where: {
            id,
            status: 'DRAFT',
            coverImageKey: record.key,
          },
          data: { coverImageKey: key },
        });

    if (result.count !== 1) {
      throw new ConflictException(
        'Le contenu a ete modifie. Actualisez la page.',
      );
    }

    return {
      success: true,
      imageKey: key,
      size: buffer.length,
      mimeType: 'image/webp',
    };
  }

  async getImage(
    kind: ImageKind,
    id: string,
    publicOnly: boolean,
  ): Promise<Buffer> {
    const record = await this.findRecord(kind, id);

    if (publicOnly && record.status !== 'PUBLISHED') {
      throw new NotFoundException('Image introuvable.');
    }

    if (
      !record.key ||
      !/^[a-f0-9-]{36}\.webp$/.test(record.key)
    ) {
      throw new NotFoundException('Image introuvable.');
    }

    try {
      return await readFile(
        join(this.directory, record.key),
      );
    } catch {
      throw new NotFoundException('Image indisponible.');
    }
  }
}