import { PrismaService } from '../prisma/prisma.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';
export declare class AvisService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
