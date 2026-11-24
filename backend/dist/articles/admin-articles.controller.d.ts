import { PrismaService } from '../prisma/prisma.service.js';
import { SaveArticleDto } from './dto/save-article.dto.js';
export declare class AdminArticlesController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(category?: string, pageInput?: string): Promise<{
        success: boolean;
        items: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        }[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
    create(dto: SaveArticleDto): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
    update(id: string, dto: SaveArticleDto): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
    publish(id: string): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
    archive(id: string): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
    restoreDraft(id: string): Promise<{
        success: boolean;
        article: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
}
