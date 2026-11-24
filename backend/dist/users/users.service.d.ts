import { PrismaService } from '../prisma/prisma.service.js';
export declare class UsersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findForAuthentication(email: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        passwordHash: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        updatedAt: Date;
        emailVerifiedAt: Date | null;
    } | null>;
    findPublicProfile(id: string): Promise<{
        id: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
    } | null>;
    createMember(data: {
        fullName: string;
        email: string;
        passwordHash: string;
        provinceId: string;
    }): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
    }>;
}
