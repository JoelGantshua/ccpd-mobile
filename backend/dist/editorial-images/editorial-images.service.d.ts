import { PrismaService } from '../prisma/prisma.service.js';
export type ImageKind = 'committee' | 'articles';
export declare class EditorialImagesService {
    private readonly prisma;
    private readonly directory;
    constructor(prisma: PrismaService);
    private processImage;
    private findRecord;
    upload(kind: ImageKind, id: string, file: Express.Multer.File): Promise<{
        success: boolean;
        imageKey: string;
        size: number;
        mimeType: string;
    }>;
    getImage(kind: ImageKind, id: string, publicOnly: boolean): Promise<Buffer>;
}
