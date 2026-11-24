import { PrismaService } from '../prisma/prisma.service.js';
export declare class EmailVerificationService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    issueToken(userId: string): Promise<{
        token: string;
        expiresAt: Date;
    }>;
    consumeToken(email: string, code: string): Promise<{
        verified: true;
    }>;
}
