import { PrismaService } from '../prisma/prisma.service.js';
import { CreateParticipationDto } from './dto/create-participation.dto.js';
export declare class ParticipationsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateParticipationDto): Promise<{
        success: boolean;
        message: string;
        participation: {
            id: string;
            createdAt: Date;
            status: import("../generated/prisma/enums.js").ParticipationStatus;
        };
    }>;
}
