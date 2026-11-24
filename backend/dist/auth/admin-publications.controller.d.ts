import { StreamableFile } from '@nestjs/common';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';
export declare class AdminPublicationsController {
    private readonly publications;
    constructor(publications: PublicationsService);
    list(type: string, page?: string): Promise<{
        success: boolean;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
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
    detail(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    create(dto: CreatePublicationDto): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
        };
    }>;
    update(id: string, dto: CreatePublicationDto): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    upload(id: string, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    preview(id: string): Promise<StreamableFile>;
    publish(id: string): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            type: import("../generated/prisma/enums.js").PublicationType;
            publishedAt: Date | null;
        };
    }>;
    archive(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
    draft(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
            fileName: string | null;
            fileSize: number | null;
            publishedAt: Date | null;
        };
    }>;
}
