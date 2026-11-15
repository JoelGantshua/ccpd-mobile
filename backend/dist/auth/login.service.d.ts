import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service.js';
import { UsersService } from '../users/users.service.js';
import type { LoginDto } from './dto/login.dto.js';
export declare class LoginService {
    private readonly usersService;
    private readonly authService;
    private readonly jwtService;
    constructor(usersService: UsersService, authService: AuthService, jwtService: JwtService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        tokenType: string;
        expiresIn: number;
        user: {
            id: string;
            fullName: string;
            role: import("../generated/prisma/enums.js").UserRole;
            provinceId: string | null;
        };
    }>;
}
