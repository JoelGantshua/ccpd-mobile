import * as runtime from "@prisma/client/runtime/index-browser";
export const Decimal = runtime.Decimal;
export const NullTypes = {
    DbNull: runtime.NullTypes.DbNull,
    JsonNull: runtime.NullTypes.JsonNull,
    AnyNull: runtime.NullTypes.AnyNull,
};
export const DbNull = runtime.DbNull;
export const JsonNull = runtime.JsonNull;
export const AnyNull = runtime.AnyNull;
export const ModelName = {
    Province: 'Province',
    User: 'User',
    EmailVerificationToken: 'EmailVerificationToken',
    RefreshSession: 'RefreshSession',
    Opinion: 'Opinion',
    Publication: 'Publication',
    Participation: 'Participation',
    CommitteeMember: 'CommitteeMember',
    Article: 'Article'
};
export const TransactionIsolationLevel = runtime.makeStrictEnum({
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
});
export const ProvinceScalarFieldEnum = {
    id: 'id',
    name: 'name',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const UserScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    passwordHash: 'passwordHash',
    role: 'role',
    isActive: 'isActive',
    provinceId: 'provinceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    emailVerifiedAt: 'emailVerifiedAt'
};
export const EmailVerificationTokenScalarFieldEnum = {
    id: 'id',
    tokenHash: 'tokenHash',
    userId: 'userId',
    expiresAt: 'expiresAt',
    consumedAt: 'consumedAt',
    attempts: 'attempts',
    createdAt: 'createdAt'
};
export const RefreshSessionScalarFieldEnum = {
    id: 'id',
    userId: 'userId',
    tokenHash: 'tokenHash',
    expiresAt: 'expiresAt',
    revokedAt: 'revokedAt',
    lastUsedAt: 'lastUsedAt',
    createdAt: 'createdAt'
};
export const OpinionScalarFieldEnum = {
    provinceId: 'provinceId',
    authorId: 'authorId',
    id: 'id',
    authorName: 'authorName',
    isAnonymous: 'isAnonymous',
    content: 'content',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publicationId: 'publicationId'
};
export const PublicationScalarFieldEnum = {
    id: 'id',
    title: 'title',
    description: 'description',
    type: 'type',
    status: 'status',
    doctrineNumber: 'doctrineNumber',
    doctrineVersion: 'doctrineVersion',
    fileName: 'fileName',
    storageKey: 'storageKey',
    mimeType: 'mimeType',
    fileSize: 'fileSize',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
};
export const ParticipationScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    email: 'email',
    phone: 'phone',
    motivation: 'motivation',
    status: 'status',
    emailVerifiedAt: 'emailVerifiedAt',
    provinceId: 'provinceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
};
export const CommitteeMemberScalarFieldEnum = {
    id: 'id',
    fullName: 'fullName',
    position: 'position',
    biography: 'biography',
    photoKey: 'photoKey',
    displayOrder: 'displayOrder',
    status: 'status',
    provinceId: 'provinceId',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
};
export const ArticleScalarFieldEnum = {
    id: 'id',
    title: 'title',
    summary: 'summary',
    content: 'content',
    category: 'category',
    coverImageKey: 'coverImageKey',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    publishedAt: 'publishedAt'
};
export const SortOrder = {
    asc: 'asc',
    desc: 'desc'
};
export const QueryMode = {
    default: 'default',
    insensitive: 'insensitive'
};
export const NullsOrder = {
    first: 'first',
    last: 'last'
};
//# sourceMappingURL=prismaNamespaceBrowser.js.map