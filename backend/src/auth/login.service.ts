
import {
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  
  import { AuthService } from './auth.service.js';
  import { UsersService } from '../users/users.service.js';
  import type { LoginDto } from './dto/login.dto.js';
  
  @Injectable()
  export class LoginService {
    constructor(
      private readonly usersService: UsersService,
      private readonly authService: AuthService,
      private readonly jwtService: JwtService,
    ) {}
  
    async login(dto: LoginDto) {
      const invalid = () =>
        new UnauthorizedException(
          'Identifiants invalides ou compte non autorise',
        );
  
      const email = dto.email.trim().toLowerCase();
  
      const user =
        await this.usersService.findForAuthentication(email);
  
      if (!user) {
        throw invalid();
      }
  
      const passwordValid =
        await this.authService.verifyPassword(
          user.passwordHash,
          dto.password,
        );
  
      if (!passwordValid) {
        throw invalid();
      }
  
      if (!user.emailVerifiedAt || !user.isActive) {
        throw invalid();
      }
  
      const accessToken = await this.jwtService.signAsync({
        sub: user.id,
        typ: 'access',
      });
  
      return {
        accessToken,
        tokenType: 'Bearer',
        expiresIn: 900,
        user: {
          id: user.id,
          fullName: user.fullName,
          role: user.role,
          provinceId: user.provinceId,
        },
      };
    }
  }
  