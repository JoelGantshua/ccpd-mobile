var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { AdminReportsController } from './admin-reports.controller.js';
import { AdminReportsService } from './admin-reports.service.js';
import { AdminInstitutionController } from './admin-institution.controller.js';
import { AdminInstitutionService } from './admin-institution.service.js';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller.js';
import { VerificationPageController } from './verification-page.controller.js';
import { AuthService } from './auth.service.js';
import { LoginService } from './login.service.js';
import { SessionService } from './session.service.js';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { UsersModule } from '../users/users.module.js';
import { EmailVerificationService } from './email-verification.service.js';
import { VerificationMailService } from './verification-mail.service.js';
import { AdminMembersController } from './admin-members.controller.js';
import { AdminMembersService } from './admin-members.service.js';
import { ProvincialMembersController } from './provincial-members.controller.js';
import { ProvincialMembersService } from './provincial-members.service.js';
import { PublicationsModule } from '../publications/publications.module.js';
import { AdminPublicationsController } from './admin-publications.controller.js';
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    Module({
        imports: [
            UsersModule,
            PublicationsModule,
            JwtModule.registerAsync({
                useFactory: () => {
                    const secret = process.env.JWT_SECRET;
                    if (!secret ||
                        !/^[A-Za-z0-9+/]+={0,2}$/.test(secret) ||
                        Buffer.from(secret, 'base64').length < 32) {
                        throw new Error('JWT_SECRET invalide');
                    }
                    return {
                        secret,
                        signOptions: {
                            algorithm: 'HS256',
                            expiresIn: '15m',
                            issuer: 'ccpd-mobile-api',
                            audience: 'ccpd-mobile',
                        },
                    };
                },
            }),
        ],
        controllers: [
            AuthController,
            VerificationPageController,
            AdminMembersController,
            ProvincialMembersController,
            AdminPublicationsController,
            AdminInstitutionController,
            AdminReportsController,
        ],
        providers: [
            AuthService,
            LoginService,
            SessionService,
            JwtAccessGuard,
            AdminGuard,
            EmailVerificationService,
            VerificationMailService,
            AdminMembersService,
            AdminInstitutionService,
            AdminReportsService,
            ProvincialMembersService,
        ],
        exports: [JwtAccessGuard, JwtModule],
    })
], AuthModule);
export { AuthModule };
//# sourceMappingURL=auth.module.js.map