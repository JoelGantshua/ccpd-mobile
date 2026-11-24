import { StreamableFile } from '@nestjs/common';
import { EditorialImagesService } from './editorial-images.service.js';
export declare class AdminEditorialImagesController {
    private readonly images;
    constructor(images: EditorialImagesService);
    upload(kind: string, id: string, file: Express.Multer.File): Promise<{
        success: boolean;
        imageKey: string;
        size: number;
        mimeType: string;
    }>;
    preview(kind: string, id: string): Promise<StreamableFile>;
}
export declare class PublicEditorialImagesController {
    private readonly images;
    constructor(images: EditorialImagesService);
    committeeImage(id: string): Promise<StreamableFile>;
    articleImage(id: string): Promise<StreamableFile>;
}
