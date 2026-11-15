export declare const UserRole: {
    readonly ADMIN: "ADMIN";
    readonly RESPONSABLE_PROVINCIAL: "RESPONSABLE_PROVINCIAL";
    readonly MEMBRE: "MEMBRE";
};
export type UserRole = (typeof UserRole)[keyof typeof UserRole];
export declare const OpinionStatus: {
    readonly PENDING: "PENDING";
    readonly APPROVED: "APPROVED";
    readonly REJECTED: "REJECTED";
};
export type OpinionStatus = (typeof OpinionStatus)[keyof typeof OpinionStatus];
export declare const PublicationType: {
    readonly DOCUMENT: "DOCUMENT";
    readonly DOCTRINE: "DOCTRINE";
};
export type PublicationType = (typeof PublicationType)[keyof typeof PublicationType];
export declare const PublicationStatus: {
    readonly DRAFT: "DRAFT";
    readonly PUBLISHED: "PUBLISHED";
    readonly ARCHIVED: "ARCHIVED";
};
export type PublicationStatus = (typeof PublicationStatus)[keyof typeof PublicationStatus];
