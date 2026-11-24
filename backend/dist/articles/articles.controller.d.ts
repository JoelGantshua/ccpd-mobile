import { ArticlesService } from './articles.service.js';
export declare class ArticlesController {
    private readonly articlesService;
    constructor(articlesService: ArticlesService);
    findAll(category?: string, page?: string): Promise<{
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
    findOne(id: string): Promise<{
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
