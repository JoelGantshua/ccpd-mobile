export declare class VerificationMailService {
    isConfigured(): boolean;
    sendVerificationEmail(recipient: string, code: string): Promise<void>;
}
