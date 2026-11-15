import { UsersService } from '../users/users.service.js';
import type { RegisterDto } from './dto/register.dto.js';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UsersService);
    validatePassword(password: unknown): void;
    hashPassword(password: string): Promise<string>;
    verifyPassword(passwordHash: string, password: string): Promise<boolean>;
    registerMember(dto: RegisterDto): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
    }>;
}
