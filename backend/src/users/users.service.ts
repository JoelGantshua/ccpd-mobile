
import {
    Injectable,
    BadRequestException,
    ConflictException,
  } from '@nestjs/common';
  
  import { Prisma } from '../generated/prisma/client.js';
  import { PrismaService } from '../prisma/prisma.service.js';
  
  @Injectable()
  export class UsersService {
    constructor(private readonly prisma: PrismaService) {}
  
    // Recherche interne pour l'authentification.
    // Ne jamais retourner directement cet objet dans une API publique.
    async findForAuthentication(email: string) {
      return this.prisma.user.findUnique({
        where: {
          email: email.trim().toLowerCase(),
        },
      });
    }
  
    // Profil sans mot de passe haché.
    // L'autorisation d'accès devra être vérifiée par le contrôleur.
    async findPublicProfile(id: string) {
      return this.prisma.user.findUnique({
        where: { id },
        select: {
          id: true,
          fullName: true,
          role: true,
          provinceId: true,
          isActive: true,
        },
      });
    }
  
    // Création interne d'un membre CCPD Bloc Est.
    async createMember(data: {
      fullName: string;
      email: string;
      passwordHash: string;
      provinceId: string;
    }) {
      const fullName = data.fullName.trim();
      const email = data.email.trim().toLowerCase();
  
      if (fullName.length < 2 || fullName.length > 150) {
        throw new BadRequestException('Nom invalide');
      }
  
      if (
        email.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ) {
        throw new BadRequestException('Email invalide');
      }
  
      const provincesAutorisees = [
        'Bas-Uele',
        'Haut-Uele',
        'Ituri',
        'Maniema',
        'Nord-Kivu',
        'Sud-Kivu',
        'Tanganyika',
        'Tshopo',
      ];
  
      const province = await this.prisma.province.findUnique({
        where: { id: data.provinceId },
      });
  
      if (
        !province ||
        !provincesAutorisees.includes(province.name)
      ) {
        throw new BadRequestException(
          'Province non autorisée',
        );
      }
  
      if (
        typeof data.passwordHash !== 'string' ||
        !data.passwordHash.startsWith('$argon2id$')
      ) {
        throw new BadRequestException(
          'Hachage du mot de passe invalide',
        );
      }
  
      try {
        return await this.prisma.user.create({
          data: {
            fullName,
            email,
            passwordHash: data.passwordHash,
            provinceId: province.id,
            role: 'MEMBRE',
            isActive: false,
          },
          select: {
            id: true,
            fullName: true,
            email: true,
            role: true,
            provinceId: true,
            isActive: true,
            createdAt: true,
          },
        });
      } catch (error) {
        if (
          error instanceof Prisma.PrismaClientKnownRequestError &&
          error.code === 'P2002'
        ) {
          throw new ConflictException(
            'Impossible de créer ce compte',
          );
        }
  
        throw error;
      }
    }
  }
  