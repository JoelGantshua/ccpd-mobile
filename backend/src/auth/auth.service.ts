
import {
    BadRequestException,
    Injectable,
  } from '@nestjs/common';
  import * as argon2 from 'argon2';
  import { UsersService } from '../users/users.service.js';
  import type { RegisterDto } from './dto/register.dto.js';
  
  @Injectable()
  export class AuthService {
    constructor(
      private readonly usersService: UsersService,
    ) {}
  
    validatePassword(password: unknown): void {
      if (typeof password !== 'string') {
        throw new BadRequestException(
          'Mot de passe invalide',
        );
      }
  
      const length = Array.from(password).length;
  
      if (
        length < 12 ||
        length > 128 ||
        password.includes('\0')
      ) {
        throw new BadRequestException(
          'Le mot de passe doit contenir entre 12 et 128 caractères',
        );
      }
    }
  
    async hashPassword(password: string): Promise<string> {
      this.validatePassword(password);
  
      return argon2.hash(password, {
        type: argon2.argon2id,
        memoryCost: 19456,
        timeCost: 2,
        parallelism: 1,
      });
    }
  
    async verifyPassword(
      passwordHash: string,
      password: string,
    ): Promise<boolean> {
      try {
        return await argon2.verify(
          passwordHash,
          password,
        );
      } catch {
        return false;
      }
    }
  
    // Méthode interne : aucune route HTTP
    // publique n'est encore activée.
    async registerMember(dto: RegisterDto) {
      this.validatePassword(dto.password);
  
      const passwordHash = await this.hashPassword(
        dto.password,
      );
  
      return this.usersService.createMember({
        fullName: dto.fullName,
        email: dto.email,
        passwordHash,
        provinceId: dto.provinceId,
      });
    }
  }
  