
import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  
  import { PrismaService } from '../prisma/prisma.service.js';
  
  @Injectable()
  export class AdminMembersService {
    constructor(
      private readonly prisma: PrismaService,
    ) {}
  
    private readonly publicFields = {
      id: true,
      fullName: true,
      email: true,
      role: true,
      provinceId: true,
      isActive: true,
      emailVerifiedAt: true,
      createdAt: true,
    } as const;
  
    // Membres ayant vérifié leur adresse e-mail,
    // mais dont le compte n'est pas encore activé.
    async findPending() {
      return this.prisma.user.findMany({
        where: {
          role: 'MEMBRE',
          isActive: false,
          emailVerifiedAt: {
            not: null,
          },
        },
        select: this.publicFields,
        orderBy: {
          createdAt: 'asc',
        },
        take: 100,
      });
    }
  
    // Activation atomique.
    // Aucun compte ADMIN ou RESPONSABLE_PROVINCIAL
    // ne peut être modifié par cette méthode.
    async approveMember(id: string) {
      const result = await this.prisma.user.updateMany({
        where: {
          id,
          role: 'MEMBRE',
          isActive: false,
          emailVerifiedAt: {
            not: null,
          },
        },
        data: {
          isActive: true,
        },
      });
  
      if (result.count !== 1) {
        throw new BadRequestException(
          'Membre introuvable, non vérifié ou déjà activé',
        );
      }
  
      return this.prisma.user.findUniqueOrThrow({
        where: { id },
        select: this.publicFields,
      });
    }
  }
  