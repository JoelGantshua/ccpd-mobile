export declare class VerificationMailService {
    isConfigured(): boolean;
    sendVerificationEmail(recipient: string, token: string): Promise<void>;
}
