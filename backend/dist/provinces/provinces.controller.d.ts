import { ProvincesService } from './provinces.service.js';
export declare class ProvincesController {
    private readonly provincesService;
    constructor(provincesService: ProvincesService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
