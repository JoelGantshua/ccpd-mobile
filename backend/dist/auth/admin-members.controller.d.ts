import { AdminMembersService } from './admin-members.service.js';
type AdminRequest = {
    user: {
        id: string;
        role: string;
        provinceId: string | null;
    };
};
export declare class AdminMembersController {
    private readonly adminMembers;
    constructor(adminMembers: AdminMembersService);
    private requireAdmin;
    pending(request: AdminRequest): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }[]>;
    approve(request: AdminRequest, id: string): Promise<{
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
export {};
