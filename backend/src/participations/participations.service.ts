import {
    Injectable,
    BadRequestException,
  } from '@nestjs/common';
  
  import { PrismaService } from '../prisma/prisma.service.js';
  import { CreateParticipationDto } from './dto/create-participation.dto.js';
  
  @Injectable()
  export class ParticipationsService {
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  
    async create(dto: CreateParticipationDto) {
      const province = await this.prisma.province.findUnique({
        where: {
          name: dto.province,
        },
        select: {
          id: true,
        },
      });
  
      if (!province) {
        throw new BadRequestException(
          'La province sélectionnée est invalide.',
        );
      }
  
      const participation =
        await this.prisma.participation.create({
          data: {
            fullName: dto.fullName,
            email: dto.email,
            phone: dto.phone || null,
            motivation: dto.motivation,
            provinceId: province.id,
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
        message: 'Votre demande de participation a bien été reçue.',
        participation,
      };
    }
  }