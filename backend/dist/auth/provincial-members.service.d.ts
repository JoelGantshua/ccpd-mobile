import { PrismaService } from '../prisma/prisma.service.js';
export declare class ProvincialMembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly publicFields;
    findMembers(provinceId: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }[]>;
    findPending(provinceId: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }[]>;
}
