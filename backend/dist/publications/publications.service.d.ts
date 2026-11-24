import { PrismaService } from '../prisma/prisma.service.js';
import type { PublicationType } from '../generated/prisma/client.js';
import { CreatePublicationDto } from './dto/create-publication.dto.js';
export declare class PublicationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPublished(type?: string, pageInput?: string): Promise<{
        success: boolean;
        items: {
            id: string;
            title: string;
            description: string | null;
            type: PublicationType;
            publishedAt: Date | null;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findPublishedById(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            title: string;
            description: string | null;
            type: PublicationType;
            publishedAt: Date | null;
        };
    }>;
    createDraft(dto: CreatePublicationDto): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
        };
    }>;
    attachPdf(id: string, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    getPublishedPdf(id: string): Promise<NonSharedBuffer>;
    getAdminPdf(id: string): Promise<NonSharedBuffer>;
    private readPdf;
    publish(id: string): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            type: PublicationType;
            publishedAt: Date | null;
        };
    }>;
    findPublishedDoctrines(): Promise<{
        success: boolean;
        items: {
            number: number;
            title: string;
            courte: {
                id: string;
                title: string;
            } | null;
            integrale: {
                id: string;
                title: string;
            } | null;
        }[];
        total: number;
    }>;
    private readonly adminSelect;
    private adminMetadata;
    adminList(type: string, pageInput?: string): Promise<{
        success: boolean;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    adminDetail(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    adminUpdate(id: string, dto: CreatePublicationDto): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    adminStatus(id: string, status: 'DRAFT' | 'ARCHIVED'): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
}
