import { ParticipationsService } from './participations.service.js';
import { CreateParticipationDto } from './dto/create-participation.dto.js';
export declare class ParticipationsController {
    private readonly participationsService;
    constructor(participationsService: ParticipationsService);
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
