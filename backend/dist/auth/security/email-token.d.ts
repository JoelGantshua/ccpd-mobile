export declare function hashEmailCode(userId: string, code: string): string;
export declare function generateEmailVerificationCode(userId: string): {
    code: string;
    codeHash: string;
    expiresAt: Date;
};
