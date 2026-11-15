import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';
type AdminRequest = {
    user: {
        id: string;
        role: string;
        provinceId: string | null;
    };
};
export declare class AdminPublicationsController {
    private readonly publications;
    constructor(publications: PublicationsService);
    create(request: AdminRequest, dto: CreatePublicationDto): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            createdAt: Date;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string;
            description: string | null;
            status: import("../generated/prisma/enums.js").PublicationStatus;
        };
    }>;
    uploadPdf(request: AdminRequest, id: string, file?: Express.Multer.File): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            fileName: string | null;
            fileSize: number | null;
        };
    }>;
    publish(request: AdminRequest, id: string): Promise<{
        success: boolean;
        message: string;
        publication: {
            id: string;
            type: import("../generated/prisma/enums.js").PublicationType;
            title: string;
            status: import("../generated/prisma/enums.js").PublicationStatus;
            publishedAt: Date | null;
        };
    }>;
}
export {};
