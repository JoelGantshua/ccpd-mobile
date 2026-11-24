import { PrismaService } from '../prisma/prisma.service.js';
export declare class AdminInstitutionService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private filters;
    private result;
    members(provinceId?: string, page?: string): Promise<{
        success: boolean;
        items: {
            province: {
                id: string;
                name: string;
            } | null;
            id: string;
            createdAt: Date;
            email: string;
            fullName: string;
            isActive: boolean;
            emailVerifiedAt: Date | null;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    opinions(provinceId?: string, page?: string): Promise<{
        success: boolean;
        items: {
            authorName: string | null;
            province: {
                id: string;
                name: string;
            } | null;
            publication: {
                id: string;
                title: string;
                type: import("../generated/prisma/enums.js").PublicationType;
                doctrineNumber: number | null;
                doctrineVersion: string | null;
            } | null;
            id: string;
            createdAt: Date;
            isAnonymous: boolean;
            content: string;
            status: import("../generated/prisma/enums.js").OpinionStatus;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    participations(provinceId?: string, page?: string): Promise<{
        success: boolean;
        items: {
            province: {
                id: string;
                name: string;
            };
            id: string;
            createdAt: Date;
            email: string;
            fullName: string;
            emailVerifiedAt: Date | null;
            status: import("../generated/prisma/enums.js").ParticipationStatus;
            phone: string | null;
            motivation: string;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    moderateOpinion(id: string, status: 'APPROVED' | 'REJECTED'): Promise<{
        success: boolean;
        id: string;
        status: "APPROVED" | "REJECTED";
    }>;
    moderateParticipation(id: string, status: 'APPROVED' | 'REJECTED'): Promise<{
        success: boolean;
        id: string;
        status: "APPROVED" | "REJECTED";
    }>;
    statistics(): Promise<{
        success: boolean;
        global: {
            members: number;
            activeMembers: number;
            pendingMembers: number;
            unverifiedMembers: number;
            opinions: number;
            pendingOpinions: number;
            approvedOpinions: number;
            rejectedOpinions: number;
            participations: number;
            pendingParticipations: number;
            approvedParticipations: number;
            rejectedParticipations: number;
        };
        provinces: {
            members: number;
            activeMembers: number;
            pendingMembers: number;
            unverifiedMembers: number;
            opinions: number;
            pendingOpinions: number;
            approvedOpinions: number;
            rejectedOpinions: number;
            participations: number;
            pendingParticipations: number;
            approvedParticipations: number;
            rejectedParticipations: number;
            id: string;
            name: string;
        }[];
        unassigned: {
            members: number;
            activeMembers: number;
            pendingMembers: number;
            unverifiedMembers: number;
            opinions: number;
            pendingOpinions: number;
            approvedOpinions: number;
            rejectedOpinions: number;
            participations: number;
            pendingParticipations: number;
            approvedParticipations: number;
            rejectedParticipations: number;
        };
    }>;
}
