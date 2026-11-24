import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
export type AvisAuthor = {
    id: string;
    fullName: string;
    role: string;
    provinceId: string | null;
};
export declare class AvisService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateAvisDto, user: AvisAuthor): Promise<{
        success: boolean;
        message: string;
        opinion: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").OpinionStatus;
            publicationId: string | null;
        };
        publication: {
            id: string;
            title: string;
            type: import("../generated/prisma/enums.js").PublicationType;
            doctrineNumber: number | null;
            doctrineVersion: string | null;
        };
    }>;
}
