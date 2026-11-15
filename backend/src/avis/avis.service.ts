import {
  Injectable,
  BadRequestException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';

@Injectable()
export class AvisService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateAvisDto) {
    const content = dto.content?.trim();
    const authorName = dto.authorName?.trim();

    if (!content || content.length < 20 || content.length > 2000) {
      throw new BadRequestException(
        'La contribution doit contenir entre 20 et 2000 caractères.',
      );
    }

    if (
      !dto.isAnonymous &&
      (!authorName || authorName.length < 2 || authorName.length > 120)
    ) {
      throw new BadRequestException(
        'Le nom complet est obligatoire pour un avis non anonyme.',
      );
    }

    const opinion = await this.prisma.opinion.create({
      data: {
        content,
        authorName: dto.isAnonymous ? null : authorName,
        isAnonymous: dto.isAnonymous,
        status: 'PENDING',
      },
      select: {
        id: true,
        status: true,
        createdAt: true,
      },
    });

    return {
      success: true,
      message: 'Votre avis a été reçu et attend validation.',
      opinion,
    };
  }
}
