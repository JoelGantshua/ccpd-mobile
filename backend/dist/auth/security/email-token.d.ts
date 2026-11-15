export declare function hashEmailToken(token: string): string;
export declare function generateEmailVerificationToken(): {
    token: string;
    tokenHash: string;
    expiresAt: Date;
};
