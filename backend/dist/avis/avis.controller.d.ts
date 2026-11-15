import { AvisService } from './avis.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
export declare class AvisController {
    private readonly avisService;
    constructor(avisService: AvisService);
    create(dto: CreateAvisDto): Promise<{
        success: boolean;
        message: string;
        opinion: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").OpinionStatus;
        };
    }>;
}
