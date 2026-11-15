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
            type: PublicationType;
            title: string;
            description: string | null;
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
            type: PublicationType;
            title: string;
            description: string | null;
            publishedAt: Date | null;
        };
    }>;
    createDraft(dto: CreatePublicationDto): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            type: PublicationType;
            title: string;
            description: string | null;
            status: import("../generated/prisma/enums.js").PublicationStatus;
        };
    }>;
    attachPdf(id: string, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            type: PublicationType;
            title: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            fileName: string | null;
            fileSize: number | null;
        };
    }>;
    getPublishedPdf(id: string): Promise<NonSharedBuffer>;
    publish(id: string): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            type: PublicationType;
            title: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
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
}
