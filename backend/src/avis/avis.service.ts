import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';

export type AvisAuthor = {
  id: string;
  fullName: string;
  role: string;
  provinceId: string | null;
};

@Injectable()
export class AvisService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateAvisDto, user: AvisAuthor) {
    if (!user.provinceId) {
      throw new ForbiddenException(
        'Votre compte doit etre rattache a une province.',
      );
    }

    const content = dto.content.trim();

    if (content.length < 20 || content.length > 2000) {
      throw new BadRequestException(
        'La contribution doit contenir entre 20 et 2000 caracteres.',
      );
    }

    const publication = await this.prisma.publication.findFirst({
      where: {
        id: dto.publicationId,
        status: 'PUBLISHED',
      },
      select: {
        id: true,
        title: true,
        type: true,
        doctrineNumber: true,
        doctrineVersion: true,
      },
    });

    if (!publication) {
      throw new BadRequestException(
        'La publication selectionnee est indisponible.',
      );
    }

    const opinion = await this.prisma.opinion.create({
      data: {
        content,
        publicationId: publication.id,
        isAnonymous: dto.isAnonymous,
        authorName: dto.isAnonymous ? null : user.fullName,
        authorId: dto.isAnonymous ? null : user.id,
        provinceId: user.provinceId,
        status: 'PENDING',
      },
      select: {
        id: true,
        publicationId: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: 'Votre avis a ete recu et attend validation.',
      opinion,
      publication,
    };
  }
}
