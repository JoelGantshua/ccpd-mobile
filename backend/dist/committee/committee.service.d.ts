import { PrismaService } from '../prisma/prisma.service.js';
export declare class CommitteeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findPublished(): Promise<{
        success: boolean;
        total: number;
        items: {
            province: {
                id: string;
                name: string;
            } | null;
            id: string;
            fullName: string;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        }[];
    }>;
    findPublishedById(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
            id: string;
            fullName: string;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
}
