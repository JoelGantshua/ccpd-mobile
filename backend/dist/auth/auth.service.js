var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, Injectable, } from '@nestjs/common';
import * as argon2 from 'argon2';
import { UsersService } from '../users/users.service.js';
let AuthService = class AuthService {
    usersService;
    constructor(usersService) {
        this.usersService = usersService;
    }
    validatePassword(password) {
        if (typeof password !== 'string') {
            throw new BadRequestException('Mot de passe invalide');
        }
        const length = Array.from(password).length;
        if (length < 12 ||
            length > 128 ||
            password.includes('\0')) {
            throw new BadRequestException('Le mot de passe doit contenir entre 12 et 128 caractères');
        }
    }
    async hashPassword(password) {
        this.validatePassword(password);
        return argon2.hash(password, {
            type: argon2.argon2id,
            memoryCost: 19456,
            timeCost: 2,
            parallelism: 1,
        });
    }
    async verifyPassword(passwordHash, password) {
        try {
            return await argon2.verify(passwordHash, password);
        }
        catch {
            return false;
        }
    }
    async registerMember(dto) {
        this.validatePassword(dto.password);
        const passwordHash = await this.hashPassword(dto.password);
        return this.usersService.createMember({
            fullName: dto.fullName,
            email: dto.email,
            passwordHash,
            provinceId: dto.provinceId,
        });
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [UsersService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map