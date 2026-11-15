var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Req, ServiceUnavailableException, UseGuards, } from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { AuthService } from './auth.service.js';
import { LoginService } from './login.service.js';
import { SessionService } from './session.service.js';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { EmailVerificationService } from './email-verification.service.js';
import { VerificationMailService } from './verification-mail.service.js';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
let AuthController = class AuthController {
    authService;
    emailVerificationService;
    verificationMailService;
    usersService;
    loginService;
    sessionService;
    constructor(authService, emailVerificationService, verificationMailService, usersService, loginService, sessionService) {
        this.authService = authService;
        this.emailVerificationService = emailVerificationService;
        this.verificationMailService = verificationMailService;
        this.usersService = usersService;
        this.loginService = loginService;
        this.sessionService = sessionService;
    }
    async register(dto) {
        if (!this.verificationMailService.isConfigured()) {
            throw new ServiceUnavailableException('Inscription temporairement indisponible');
        }
        const user = await this.authService.registerMember(dto);
        const verification = await this.emailVerificationService.issueToken(user.id);
        try {
            await this.verificationMailService.sendVerificationEmail(user.email, verification.token);
        }
        catch {
            throw new ServiceUnavailableException('Envoi de verification indisponible');
        }
        return {
            message: 'Inscription enregistree. Verifiez votre messagerie.',
            requiresEmailVerification: true,
            requiresAdminApproval: true,
        };
    }
    async verifyEmail(dto) {
        return this.emailVerificationService.consumeToken(dto.token);
    }
    async resendVerification(dto) {
        if (!this.verificationMailService.isConfigured()) {
            throw new ServiceUnavailableException('Service de verification indisponible');
        }
        const response = {
            message: 'Si ce compte necessite une verification, un e-mail pourra etre envoye.',
        };
        const user = await this.usersService.findForAuthentication(dto.email.trim().toLowerCase());
        if (!user || user.emailVerifiedAt) {
            return response;
        }
        let token;
        try {
            const verification = await this.emailVerificationService.issueToken(user.id);
            token = verification.token;
        }
        catch (error) {
            if (error instanceof HttpException &&
                error.getStatus() === HttpStatus.TOO_MANY_REQUESTS) {
                return response;
            }
            throw error;
        }
        try {
            await this.verificationMailService.sendVerificationEmail(user.email, token);
        }
        catch {
        }
        return response;
    }
    async login(dto) {
        const result = await this.loginService.login(dto);
        const session = await this.sessionService.createSession(result.user.id);
        return {
            ...result,
            accessToken: session.accessToken,
            refreshToken: session.refreshToken,
        };
    }
    async refresh(dto) {
        return this.sessionService.refresh(dto.refreshToken);
    }
    async logout(request, dto) {
        return this.sessionService.logout(request.user.id, dto.refreshToken);
    }
    async logoutAll(request) {
        return this.sessionService.logoutAll(request.user.id);
    }
    async me(request) {
        return request.user;
    }
};
__decorate([
    Post('register'),
    HttpCode(HttpStatus.ACCEPTED),
    Throttle({ default: { limit: 3, ttl: 60_000 } }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('verify-email'),
    HttpCode(HttpStatus.OK),
    Throttle({ default: { limit: 5, ttl: 60_000 } }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [VerifyEmailDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    Post('resend-verification'),
    HttpCode(HttpStatus.ACCEPTED),
    Throttle({ default: { limit: 3, ttl: 60_000 } }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResendVerificationDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendVerification", null);
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    Throttle({ default: { limit: 5, ttl: 60_000 } }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('refresh'),
    HttpCode(HttpStatus.OK),
    Throttle({ default: { limit: 10, ttl: 60_000 } }),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "refresh", null);
__decorate([
    Post('logout'),
    HttpCode(HttpStatus.OK),
    UseGuards(JwtAccessGuard),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, RefreshTokenDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Post('logout-all'),
    HttpCode(HttpStatus.OK),
    UseGuards(JwtAccessGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutAll", null);
__decorate([
    Get('me'),
    UseGuards(JwtAccessGuard),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "me", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService,
        EmailVerificationService,
        VerificationMailService,
        UsersService,
        LoginService,
        SessionService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map