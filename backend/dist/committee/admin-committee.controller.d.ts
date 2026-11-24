import { PrismaService } from '../prisma/prisma.service.js';
import { SaveCommitteeMemberDto } from './dto/save-committee-member.dto.js';
export declare class AdminCommitteeController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(pageInput?: string): Promise<{
        success: boolean;
        items: ({
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        })[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
    private validateProvince;
    create(dto: SaveCommitteeMemberDto): Promise<{
        success: boolean;
        member: {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
    update(id: string, dto: SaveCommitteeMemberDto): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
    publish(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
    archive(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
    restoreDraft(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            fullName: string;
            provinceId: string | null;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
}
