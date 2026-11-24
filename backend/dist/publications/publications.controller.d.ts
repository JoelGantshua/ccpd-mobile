import { PublicationsService } from './publications.service.js';
import { StreamableFile } from '@nestjs/common';
export declare class PublicationsController {
    private readonly publicationsService;
    constructor(publicationsService: PublicationsService);
    findPublished(type?: string, page?: string): Promise<{
        success: boolean;
        items: {
            id: string;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            publishedAt: Date | null;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
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
    findPublishedById(id: string): Promise<{
        success: boolean;
        publication: {
            id: string;
            title: string;
            description: string | null;
            type: import("../generated/prisma/enums.js").PublicationType;
            publishedAt: Date | null;
        };
    }>;
    getPdf(id: string): Promise<StreamableFile>;
}
