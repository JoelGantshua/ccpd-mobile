import { AuthService } from './auth.service.js';
import { LoginService } from './login.service.js';
import { SessionService } from './session.service.js';
import { EmailVerificationService } from './email-verification.service.js';
import { VerificationMailService } from './verification-mail.service.js';
import { UsersService } from '../users/users.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { VerifyEmailDto } from './dto/verify-email.dto.js';
import { ResendVerificationDto } from './dto/resend-verification.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { RefreshTokenDto } from './dto/refresh-token.dto.js';
type AuthenticatedRequest = {
    user: {
        id: string;
        fullName: string;
        role: string;
        provinceId: string | null;
    };
};
export declare class AuthController {
    private readonly authService;
    private readonly emailVerificationService;
    private readonly verificationMailService;
    private readonly usersService;
    private readonly loginService;
    private readonly sessionService;
    constructor(authService: AuthService, emailVerificationService: EmailVerificationService, verificationMailService: VerificationMailService, usersService: UsersService, loginService: LoginService, sessionService: SessionService);
    register(dto: RegisterDto): Promise<{
        message: string;
        requiresEmailVerification: boolean;
        requiresAdminApproval: boolean;
    }>;
    verifyEmail(dto: VerifyEmailDto): Promise<{
        verified: true;
    }>;
    resendVerification(dto: ResendVerificationDto): Promise<{
        message: string;
    }>;
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            role: import("../generated/prisma/enums.js").UserRole;
            provinceId: string | null;
        };
    }>;
    refresh(dto: RefreshTokenDto): Promise<{
        accessToken: string;
        refreshToken: string;
        tokenType: string;
        expiresIn: number;
    }>;
    logout(request: AuthenticatedRequest, dto: RefreshTokenDto): Promise<{
        success: boolean;
    }>;
    logoutAll(request: AuthenticatedRequest): Promise<{
        success: boolean;
    }>;
    me(request: AuthenticatedRequest): Promise<{
        id: string;
        fullName: string;
        role: string;
        provinceId: string | null;
    }>;
}
export {};
