import { ProvincesService } from './provinces.service.js';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
    }[]>;
}
