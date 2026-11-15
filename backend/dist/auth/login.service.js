var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
let LoginService = class LoginService {
    usersService;
    authService;
    jwtService;
    constructor(usersService, authService, jwtService) {
        this.usersService = usersService;
        this.authService = authService;
        this.jwtService = jwtService;
    }
    async login(dto) {
        const invalid = () => new UnauthorizedException('Identifiants invalides ou compte non autorise');
        const email = dto.email.trim().toLowerCase();
        const user = await this.usersService.findForAuthentication(email);
        if (!user) {
            throw invalid();
        }
        const passwordValid = await this.authService.verifyPassword(user.passwordHash, dto.password);
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
};
LoginService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService,
        AuthService,
        JwtService])
], LoginService);
export { LoginService };
//# sourceMappingURL=login.service.js.map