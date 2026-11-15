import { ProvincialMembersService } from './provincial-members.service.js';
type ProvincialRequest = {
    user: {
        id: string;
        role: string;
        provinceId: string | null;
    };
};
export declare class ProvincialMembersController {
    private readonly provincialMembers;
    constructor(provincialMembers: ProvincialMembersService);
    private requireProvincialAccess;
    members(request: ProvincialRequest): Promise<{
        id: string;
        createdAt: Date;
        email: string;
        fullName: string;
        role: import("../generated/prisma/enums.js").UserRole;
        isActive: boolean;
        provinceId: string | null;
        emailVerifiedAt: Date | null;
    }[]>;
    pending(request: ProvincialRequest): Promise<{
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
export {};
