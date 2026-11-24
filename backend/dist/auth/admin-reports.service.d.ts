import ExcelJS from 'exceljs';
import { PrismaService } from '../prisma/prisma.service.js';
export declare class AdminReportsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generate(kind: string, scope: string): Promise<Buffer<ExcelJS.Buffer>>;
}
