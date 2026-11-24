import { CommitteeService } from './committee.service.js';
export declare class CommitteeController {
    private readonly committeeService;
    constructor(committeeService: CommitteeService);
    findAll(): Promise<{
        success: boolean;
        total: number;
        items: {
            province: {
                id: string;
                name: string;
            } | null;
            id: string;
            fullName: string;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        }[];
    }>;
    findOne(id: string): Promise<{
        success: boolean;
        member: {
            province: {
                id: string;
                name: string;
            } | null;
            id: string;
            fullName: string;
            publishedAt: Date | null;
            position: string;
            biography: string | null;
            photoKey: string | null;
            displayOrder: number;
        };
    }>;
}
