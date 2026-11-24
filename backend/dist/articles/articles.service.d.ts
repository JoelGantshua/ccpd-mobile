import { PrismaService } from '../prisma/prisma.service.js';
export declare class ArticlesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPublished(categoryInput: unknown, pageInput?: unknown): Promise<{
        success: boolean;
        items: {
            id: string;
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
    findPublishedById(id: string): Promise<{
        success: boolean;
        article: {
            id: string;
            content: string;
            title: string;
            publishedAt: Date | null;
            summary: string;
            category: import("../generated/prisma/enums.js").ArticleCategory;
            coverImageKey: string | null;
        };
    }>;
}
