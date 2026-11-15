import { PrismaService } from '../prisma/prisma.service.js';
export declare class AdminMembersService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private readonly publicFields;
    findPending(): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }[]>;
    approveMember(id: string): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }>;
}
