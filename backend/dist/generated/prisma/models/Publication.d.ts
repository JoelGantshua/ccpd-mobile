import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type PublicationModel = runtime.Types.Result.DefaultSelection<Prisma.$PublicationPayload>;
export type AggregatePublication = {
    _count: PublicationCountAggregateOutputType | null;
    _avg: PublicationAvgAggregateOutputType | null;
    _sum: PublicationSumAggregateOutputType | null;
    _min: PublicationMinAggregateOutputType | null;
    _max: PublicationMaxAggregateOutputType | null;
};
export type PublicationAvgAggregateOutputType = {
    doctrineNumber: number | null;
    fileSize: number | null;
};
export type PublicationSumAggregateOutputType = {
    doctrineNumber: number | null;
    fileSize: number | null;
};
export type PublicationMinAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    type: $Enums.PublicationType | null;
    status: $Enums.PublicationStatus | null;
    doctrineNumber: number | null;
    doctrineVersion: string | null;
    fileName: string | null;
    storageKey: string | null;
    mimeType: string | null;
    fileSize: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publishedAt: Date | null;
};
export type PublicationMaxAggregateOutputType = {
    id: string | null;
    title: string | null;
    description: string | null;
    type: $Enums.PublicationType | null;
    status: $Enums.PublicationStatus | null;
    doctrineNumber: number | null;
    doctrineVersion: string | null;
    fileName: string | null;
    storageKey: string | null;
    mimeType: string | null;
    fileSize: number | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publishedAt: Date | null;
};
export type PublicationCountAggregateOutputType = {
    id: number;
    title: number;
    description: number;
    type: number;
    status: number;
    doctrineNumber: number;
    doctrineVersion: number;
    fileName: number;
    storageKey: number;
    mimeType: number;
    fileSize: number;
    createdAt: number;
    updatedAt: number;
    publishedAt: number;
    _all: number;
};
export type PublicationAvgAggregateInputType = {
    doctrineNumber?: true;
    fileSize?: true;
};
export type PublicationSumAggregateInputType = {
    doctrineNumber?: true;
    fileSize?: true;
};
export type PublicationMinAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    type?: true;
    status?: true;
    doctrineNumber?: true;
    doctrineVersion?: true;
    fileName?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
};
export type PublicationMaxAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    type?: true;
    status?: true;
    doctrineNumber?: true;
    doctrineVersion?: true;
    fileName?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
};
export type PublicationCountAggregateInputType = {
    id?: true;
    title?: true;
    description?: true;
    type?: true;
    status?: true;
    doctrineNumber?: true;
    doctrineVersion?: true;
    fileName?: true;
    storageKey?: true;
    mimeType?: true;
    fileSize?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
    _all?: true;
};
export type PublicationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | PublicationCountAggregateInputType;
    _avg?: PublicationAvgAggregateInputType;
    _sum?: PublicationSumAggregateInputType;
    _min?: PublicationMinAggregateInputType;
    _max?: PublicationMaxAggregateInputType;
};
export type GetPublicationAggregateType<T extends PublicationAggregateArgs> = {
    [P in keyof T & keyof AggregatePublication]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePublication[P]> : Prisma.GetScalarType<T[P], AggregatePublication[P]>;
};
export type PublicationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithAggregationInput | Prisma.PublicationOrderByWithAggregationInput[];
    by: Prisma.PublicationScalarFieldEnum[] | Prisma.PublicationScalarFieldEnum;
    having?: Prisma.PublicationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PublicationCountAggregateInputType | true;
    _avg?: PublicationAvgAggregateInputType;
    _sum?: PublicationSumAggregateInputType;
    _min?: PublicationMinAggregateInputType;
    _max?: PublicationMaxAggregateInputType;
};
export type PublicationGroupByOutputType = {
    id: string;
    title: string;
    description: string | null;
    type: $Enums.PublicationType;
    status: $Enums.PublicationStatus;
    doctrineNumber: number | null;
    doctrineVersion: string | null;
    fileName: string | null;
    storageKey: string | null;
    mimeType: string | null;
    fileSize: number | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    _count: PublicationCountAggregateOutputType | null;
    _avg: PublicationAvgAggregateOutputType | null;
    _sum: PublicationSumAggregateOutputType | null;
    _min: PublicationMinAggregateOutputType | null;
    _max: PublicationMaxAggregateOutputType | null;
};
export type GetPublicationGroupByPayload<T extends PublicationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PublicationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PublicationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PublicationGroupByOutputType[P]>;
}>>;
export type PublicationWhereInput = {
    AND?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    OR?: Prisma.PublicationWhereInput[];
    NOT?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    id?: Prisma.StringFilter<"Publication"> | string;
    title?: Prisma.StringFilter<"Publication"> | string;
    description?: Prisma.StringNullableFilter<"Publication"> | string | null;
    type?: Prisma.EnumPublicationTypeFilter<"Publication"> | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFilter<"Publication"> | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.IntNullableFilter<"Publication"> | number | null;
    doctrineVersion?: Prisma.StringNullableFilter<"Publication"> | string | null;
    fileName?: Prisma.StringNullableFilter<"Publication"> | string | null;
    storageKey?: Prisma.StringNullableFilter<"Publication"> | string | null;
    mimeType?: Prisma.StringNullableFilter<"Publication"> | string | null;
    fileSize?: Prisma.IntNullableFilter<"Publication"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Publication"> | Date | string | null;
    opinions?: Prisma.OpinionListRelationFilter;
};
export type PublicationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    doctrineNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    doctrineVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileName?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    mimeType?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSize?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    opinions?: Prisma.OpinionOrderByRelationAggregateInput;
};
export type PublicationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    OR?: Prisma.PublicationWhereInput[];
    NOT?: Prisma.PublicationWhereInput | Prisma.PublicationWhereInput[];
    title?: Prisma.StringFilter<"Publication"> | string;
    description?: Prisma.StringNullableFilter<"Publication"> | string | null;
    type?: Prisma.EnumPublicationTypeFilter<"Publication"> | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFilter<"Publication"> | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.IntNullableFilter<"Publication"> | number | null;
    doctrineVersion?: Prisma.StringNullableFilter<"Publication"> | string | null;
    fileName?: Prisma.StringNullableFilter<"Publication"> | string | null;
    storageKey?: Prisma.StringNullableFilter<"Publication"> | string | null;
    mimeType?: Prisma.StringNullableFilter<"Publication"> | string | null;
    fileSize?: Prisma.IntNullableFilter<"Publication"> | number | null;
    createdAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Publication"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"Publication"> | Date | string | null;
    opinions?: Prisma.OpinionListRelationFilter;
}, "id">;
export type PublicationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    doctrineNumber?: Prisma.SortOrderInput | Prisma.SortOrder;
    doctrineVersion?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileName?: Prisma.SortOrderInput | Prisma.SortOrder;
    storageKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    mimeType?: Prisma.SortOrderInput | Prisma.SortOrder;
    fileSize?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.PublicationCountOrderByAggregateInput;
    _avg?: Prisma.PublicationAvgOrderByAggregateInput;
    _max?: Prisma.PublicationMaxOrderByAggregateInput;
    _min?: Prisma.PublicationMinOrderByAggregateInput;
    _sum?: Prisma.PublicationSumOrderByAggregateInput;
};
export type PublicationScalarWhereWithAggregatesInput = {
    AND?: Prisma.PublicationScalarWhereWithAggregatesInput | Prisma.PublicationScalarWhereWithAggregatesInput[];
    OR?: Prisma.PublicationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PublicationScalarWhereWithAggregatesInput | Prisma.PublicationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Publication"> | string;
    title?: Prisma.StringWithAggregatesFilter<"Publication"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    type?: Prisma.EnumPublicationTypeWithAggregatesFilter<"Publication"> | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusWithAggregatesFilter<"Publication"> | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.IntNullableWithAggregatesFilter<"Publication"> | number | null;
    doctrineVersion?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    fileName?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    storageKey?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    mimeType?: Prisma.StringNullableWithAggregatesFilter<"Publication"> | string | null;
    fileSize?: Prisma.IntNullableWithAggregatesFilter<"Publication"> | number | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Publication"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Publication"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Publication"> | Date | string | null;
};
export type PublicationCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    type: $Enums.PublicationType;
    status?: $Enums.PublicationStatus;
    doctrineNumber?: number | null;
    doctrineVersion?: string | null;
    fileName?: string | null;
    storageKey?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
    opinions?: Prisma.OpinionCreateNestedManyWithoutPublicationInput;
};
export type PublicationUncheckedCreateInput = {
    id?: string;
    title: string;
    description?: string | null;
    type: $Enums.PublicationType;
    status?: $Enums.PublicationStatus;
    doctrineNumber?: number | null;
    doctrineVersion?: string | null;
    fileName?: string | null;
    storageKey?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
    opinions?: Prisma.OpinionUncheckedCreateNestedManyWithoutPublicationInput;
};
export type PublicationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    opinions?: Prisma.OpinionUpdateManyWithoutPublicationNestedInput;
};
export type PublicationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    opinions?: Prisma.OpinionUncheckedUpdateManyWithoutPublicationNestedInput;
};
export type PublicationCreateManyInput = {
    id?: string;
    title: string;
    description?: string | null;
    type: $Enums.PublicationType;
    status?: $Enums.PublicationStatus;
    doctrineNumber?: number | null;
    doctrineVersion?: string | null;
    fileName?: string | null;
    storageKey?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type PublicationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PublicationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PublicationNullableScalarRelationFilter = {
    is?: Prisma.PublicationWhereInput | null;
    isNot?: Prisma.PublicationWhereInput | null;
};
export type PublicationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    doctrineNumber?: Prisma.SortOrder;
    doctrineVersion?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type PublicationAvgOrderByAggregateInput = {
    doctrineNumber?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
};
export type PublicationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    doctrineNumber?: Prisma.SortOrder;
    doctrineVersion?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type PublicationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    title?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    doctrineNumber?: Prisma.SortOrder;
    doctrineVersion?: Prisma.SortOrder;
    fileName?: Prisma.SortOrder;
    storageKey?: Prisma.SortOrder;
    mimeType?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type PublicationSumOrderByAggregateInput = {
    doctrineNumber?: Prisma.SortOrder;
    fileSize?: Prisma.SortOrder;
};
export type PublicationCreateNestedOneWithoutOpinionsInput = {
    create?: Prisma.XOR<Prisma.PublicationCreateWithoutOpinionsInput, Prisma.PublicationUncheckedCreateWithoutOpinionsInput>;
    connectOrCreate?: Prisma.PublicationCreateOrConnectWithoutOpinionsInput;
    connect?: Prisma.PublicationWhereUniqueInput;
};
export type PublicationUpdateOneWithoutOpinionsNestedInput = {
    create?: Prisma.XOR<Prisma.PublicationCreateWithoutOpinionsInput, Prisma.PublicationUncheckedCreateWithoutOpinionsInput>;
    connectOrCreate?: Prisma.PublicationCreateOrConnectWithoutOpinionsInput;
    upsert?: Prisma.PublicationUpsertWithoutOpinionsInput;
    disconnect?: Prisma.PublicationWhereInput | boolean;
    delete?: Prisma.PublicationWhereInput | boolean;
    connect?: Prisma.PublicationWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.PublicationUpdateToOneWithWhereWithoutOpinionsInput, Prisma.PublicationUpdateWithoutOpinionsInput>, Prisma.PublicationUncheckedUpdateWithoutOpinionsInput>;
};
export type EnumPublicationTypeFieldUpdateOperationsInput = {
    set?: $Enums.PublicationType;
};
export type EnumPublicationStatusFieldUpdateOperationsInput = {
    set?: $Enums.PublicationStatus;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type PublicationCreateWithoutOpinionsInput = {
    id?: string;
    title: string;
    description?: string | null;
    type: $Enums.PublicationType;
    status?: $Enums.PublicationStatus;
    doctrineNumber?: number | null;
    doctrineVersion?: string | null;
    fileName?: string | null;
    storageKey?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type PublicationUncheckedCreateWithoutOpinionsInput = {
    id?: string;
    title: string;
    description?: string | null;
    type: $Enums.PublicationType;
    status?: $Enums.PublicationStatus;
    doctrineNumber?: number | null;
    doctrineVersion?: string | null;
    fileName?: string | null;
    storageKey?: string | null;
    mimeType?: string | null;
    fileSize?: number | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type PublicationCreateOrConnectWithoutOpinionsInput = {
    where: Prisma.PublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationCreateWithoutOpinionsInput, Prisma.PublicationUncheckedCreateWithoutOpinionsInput>;
};
export type PublicationUpsertWithoutOpinionsInput = {
    update: Prisma.XOR<Prisma.PublicationUpdateWithoutOpinionsInput, Prisma.PublicationUncheckedUpdateWithoutOpinionsInput>;
    create: Prisma.XOR<Prisma.PublicationCreateWithoutOpinionsInput, Prisma.PublicationUncheckedCreateWithoutOpinionsInput>;
    where?: Prisma.PublicationWhereInput;
};
export type PublicationUpdateToOneWithWhereWithoutOpinionsInput = {
    where?: Prisma.PublicationWhereInput;
    data: Prisma.XOR<Prisma.PublicationUpdateWithoutOpinionsInput, Prisma.PublicationUncheckedUpdateWithoutOpinionsInput>;
};
export type PublicationUpdateWithoutOpinionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PublicationUncheckedUpdateWithoutOpinionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    title?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    type?: Prisma.EnumPublicationTypeFieldUpdateOperationsInput | $Enums.PublicationType;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    doctrineNumber?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    doctrineVersion?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    storageKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mimeType?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    fileSize?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type PublicationCountOutputType = {
    opinions: number;
};
export type PublicationCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    opinions?: boolean | PublicationCountOutputTypeCountOpinionsArgs;
};
export type PublicationCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationCountOutputTypeSelect<ExtArgs> | null;
};
export type PublicationCountOutputTypeCountOpinionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpinionWhereInput;
};
export type PublicationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    type?: boolean;
    status?: boolean;
    doctrineNumber?: boolean;
    doctrineVersion?: boolean;
    fileName?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
    opinions?: boolean | Prisma.Publication$opinionsArgs<ExtArgs>;
    _count?: boolean | Prisma.PublicationCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["publication"]>;
export type PublicationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    type?: boolean;
    status?: boolean;
    doctrineNumber?: boolean;
    doctrineVersion?: boolean;
    fileName?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
}, ExtArgs["result"]["publication"]>;
export type PublicationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    title?: boolean;
    description?: boolean;
    type?: boolean;
    status?: boolean;
    doctrineNumber?: boolean;
    doctrineVersion?: boolean;
    fileName?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
}, ExtArgs["result"]["publication"]>;
export type PublicationSelectScalar = {
    id?: boolean;
    title?: boolean;
    description?: boolean;
    type?: boolean;
    status?: boolean;
    doctrineNumber?: boolean;
    doctrineVersion?: boolean;
    fileName?: boolean;
    storageKey?: boolean;
    mimeType?: boolean;
    fileSize?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
};
export type PublicationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "title" | "description" | "type" | "status" | "doctrineNumber" | "doctrineVersion" | "fileName" | "storageKey" | "mimeType" | "fileSize" | "createdAt" | "updatedAt" | "publishedAt", ExtArgs["result"]["publication"]>;
export type PublicationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    opinions?: boolean | Prisma.Publication$opinionsArgs<ExtArgs>;
    _count?: boolean | Prisma.PublicationCountOutputTypeDefaultArgs<ExtArgs>;
};
export type PublicationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type PublicationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $PublicationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Publication";
    objects: {
        opinions: Prisma.$OpinionPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        title: string;
        description: string | null;
        type: $Enums.PublicationType;
        status: $Enums.PublicationStatus;
        doctrineNumber: number | null;
        doctrineVersion: string | null;
        fileName: string | null;
        storageKey: string | null;
        mimeType: string | null;
        fileSize: number | null;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date | null;
    }, ExtArgs["result"]["publication"]>;
    composites: {};
};
export type PublicationGetPayload<S extends boolean | null | undefined | PublicationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PublicationPayload, S>;
export type PublicationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PublicationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PublicationCountAggregateInputType | true;
};
export interface PublicationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Publication'];
        meta: {
            name: 'Publication';
        };
    };
    findUnique<T extends PublicationFindUniqueArgs>(args: Prisma.SelectSubset<T, PublicationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends PublicationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PublicationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends PublicationFindFirstArgs>(args?: Prisma.SelectSubset<T, PublicationFindFirstArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends PublicationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PublicationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends PublicationFindManyArgs>(args?: Prisma.SelectSubset<T, PublicationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends PublicationCreateArgs>(args: Prisma.SelectSubset<T, PublicationCreateArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends PublicationCreateManyArgs>(args?: Prisma.SelectSubset<T, PublicationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends PublicationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PublicationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends PublicationDeleteArgs>(args: Prisma.SelectSubset<T, PublicationDeleteArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends PublicationUpdateArgs>(args: Prisma.SelectSubset<T, PublicationUpdateArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends PublicationDeleteManyArgs>(args?: Prisma.SelectSubset<T, PublicationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends PublicationUpdateManyArgs>(args: Prisma.SelectSubset<T, PublicationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends PublicationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PublicationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends PublicationUpsertArgs>(args: Prisma.SelectSubset<T, PublicationUpsertArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends PublicationCountArgs>(args?: Prisma.Subset<T, PublicationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PublicationCountAggregateOutputType> : number>;
    aggregate<T extends PublicationAggregateArgs>(args: Prisma.Subset<T, PublicationAggregateArgs>): Prisma.PrismaPromise<GetPublicationAggregateType<T>>;
    groupBy<T extends PublicationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PublicationGroupByArgs['orderBy'];
    } : {
        orderBy?: PublicationGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PublicationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPublicationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: PublicationFieldRefs;
}
export interface Prisma__PublicationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    opinions<T extends Prisma.Publication$opinionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Publication$opinionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface PublicationFieldRefs {
    readonly id: Prisma.FieldRef<"Publication", 'String'>;
    readonly title: Prisma.FieldRef<"Publication", 'String'>;
    readonly description: Prisma.FieldRef<"Publication", 'String'>;
    readonly type: Prisma.FieldRef<"Publication", 'PublicationType'>;
    readonly status: Prisma.FieldRef<"Publication", 'PublicationStatus'>;
    readonly doctrineNumber: Prisma.FieldRef<"Publication", 'Int'>;
    readonly doctrineVersion: Prisma.FieldRef<"Publication", 'String'>;
    readonly fileName: Prisma.FieldRef<"Publication", 'String'>;
    readonly storageKey: Prisma.FieldRef<"Publication", 'String'>;
    readonly mimeType: Prisma.FieldRef<"Publication", 'String'>;
    readonly fileSize: Prisma.FieldRef<"Publication", 'Int'>;
    readonly createdAt: Prisma.FieldRef<"Publication", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Publication", 'DateTime'>;
    readonly publishedAt: Prisma.FieldRef<"Publication", 'DateTime'>;
}
export type PublicationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
    orderBy?: Prisma.PublicationOrderByWithRelationInput | Prisma.PublicationOrderByWithRelationInput[];
    cursor?: Prisma.PublicationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PublicationScalarFieldEnum | Prisma.PublicationScalarFieldEnum[];
};
export type PublicationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationCreateInput, Prisma.PublicationUncheckedCreateInput>;
};
export type PublicationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.PublicationCreateManyInput | Prisma.PublicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.PublicationCreateManyInput | Prisma.PublicationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type PublicationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationUpdateInput, Prisma.PublicationUncheckedUpdateInput>;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.PublicationUpdateManyMutationInput, Prisma.PublicationUncheckedUpdateManyInput>;
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type PublicationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.PublicationUpdateManyMutationInput, Prisma.PublicationUncheckedUpdateManyInput>;
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type PublicationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
    create: Prisma.XOR<Prisma.PublicationCreateInput, Prisma.PublicationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.PublicationUpdateInput, Prisma.PublicationUncheckedUpdateInput>;
};
export type PublicationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where: Prisma.PublicationWhereUniqueInput;
};
export type PublicationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PublicationWhereInput;
    limit?: number;
};
export type Publication$opinionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    where?: Prisma.OpinionWhereInput;
    orderBy?: Prisma.OpinionOrderByWithRelationInput | Prisma.OpinionOrderByWithRelationInput[];
    cursor?: Prisma.OpinionWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.OpinionScalarFieldEnum | Prisma.OpinionScalarFieldEnum[];
};
export type PublicationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
};
