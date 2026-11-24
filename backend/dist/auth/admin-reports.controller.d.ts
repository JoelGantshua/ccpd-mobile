import { StreamableFile } from '@nestjs/common';
import { AdminReportsService } from './admin-reports.service.js';
export declare class AdminReportsController {
    private readonly reports;
    constructor(reports: AdminReportsService);
    excel(kind?: string, scope?: string): Promise<StreamableFile>;
}
