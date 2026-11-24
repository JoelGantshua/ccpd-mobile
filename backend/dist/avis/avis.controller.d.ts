import { AvisService } from './avis.service.js';
import type { AvisAuthor } from './avis.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
export declare class AvisController {
    private readonly avisService;
    constructor(avisService: AvisService);
    create(dto: CreateAvisDto, request: {
        user: AvisAuthor;
    }): Promise<{
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
