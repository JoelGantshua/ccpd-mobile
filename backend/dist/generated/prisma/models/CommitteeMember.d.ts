import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type CommitteeMemberModel = runtime.Types.Result.DefaultSelection<Prisma.$CommitteeMemberPayload>;
export type AggregateCommitteeMember = {
    _count: CommitteeMemberCountAggregateOutputType | null;
    _avg: CommitteeMemberAvgAggregateOutputType | null;
    _sum: CommitteeMemberSumAggregateOutputType | null;
    _min: CommitteeMemberMinAggregateOutputType | null;
    _max: CommitteeMemberMaxAggregateOutputType | null;
};
export type CommitteeMemberAvgAggregateOutputType = {
    displayOrder: number | null;
};
export type CommitteeMemberSumAggregateOutputType = {
    displayOrder: number | null;
};
export type CommitteeMemberMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    position: string | null;
    biography: string | null;
    photoKey: string | null;
    displayOrder: number | null;
    status: $Enums.PublicationStatus | null;
    provinceId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publishedAt: Date | null;
};
export type CommitteeMemberMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    position: string | null;
    biography: string | null;
    photoKey: string | null;
    displayOrder: number | null;
    status: $Enums.PublicationStatus | null;
    provinceId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publishedAt: Date | null;
};
export type CommitteeMemberCountAggregateOutputType = {
    id: number;
    fullName: number;
    position: number;
    biography: number;
    photoKey: number;
    displayOrder: number;
    status: number;
    provinceId: number;
    createdAt: number;
    updatedAt: number;
    publishedAt: number;
    _all: number;
};
export type CommitteeMemberAvgAggregateInputType = {
    displayOrder?: true;
};
export type CommitteeMemberSumAggregateInputType = {
    displayOrder?: true;
};
export type CommitteeMemberMinAggregateInputType = {
    id?: true;
    fullName?: true;
    position?: true;
    biography?: true;
    photoKey?: true;
    displayOrder?: true;
    status?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
};
export type CommitteeMemberMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    position?: true;
    biography?: true;
    photoKey?: true;
    displayOrder?: true;
    status?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
};
export type CommitteeMemberCountAggregateInputType = {
    id?: true;
    fullName?: true;
    position?: true;
    biography?: true;
    photoKey?: true;
    displayOrder?: true;
    status?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
    publishedAt?: true;
    _all?: true;
};
export type CommitteeMemberAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommitteeMemberWhereInput;
    orderBy?: Prisma.CommitteeMemberOrderByWithRelationInput | Prisma.CommitteeMemberOrderByWithRelationInput[];
    cursor?: Prisma.CommitteeMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | CommitteeMemberCountAggregateInputType;
    _avg?: CommitteeMemberAvgAggregateInputType;
    _sum?: CommitteeMemberSumAggregateInputType;
    _min?: CommitteeMemberMinAggregateInputType;
    _max?: CommitteeMemberMaxAggregateInputType;
};
export type GetCommitteeMemberAggregateType<T extends CommitteeMemberAggregateArgs> = {
    [P in keyof T & keyof AggregateCommitteeMember]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateCommitteeMember[P]> : Prisma.GetScalarType<T[P], AggregateCommitteeMember[P]>;
};
export type CommitteeMemberGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommitteeMemberWhereInput;
    orderBy?: Prisma.CommitteeMemberOrderByWithAggregationInput | Prisma.CommitteeMemberOrderByWithAggregationInput[];
    by: Prisma.CommitteeMemberScalarFieldEnum[] | Prisma.CommitteeMemberScalarFieldEnum;
    having?: Prisma.CommitteeMemberScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: CommitteeMemberCountAggregateInputType | true;
    _avg?: CommitteeMemberAvgAggregateInputType;
    _sum?: CommitteeMemberSumAggregateInputType;
    _min?: CommitteeMemberMinAggregateInputType;
    _max?: CommitteeMemberMaxAggregateInputType;
};
export type CommitteeMemberGroupByOutputType = {
    id: string;
    fullName: string;
    position: string;
    biography: string | null;
    photoKey: string | null;
    displayOrder: number;
    status: $Enums.PublicationStatus;
    provinceId: string | null;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date | null;
    _count: CommitteeMemberCountAggregateOutputType | null;
    _avg: CommitteeMemberAvgAggregateOutputType | null;
    _sum: CommitteeMemberSumAggregateOutputType | null;
    _min: CommitteeMemberMinAggregateOutputType | null;
    _max: CommitteeMemberMaxAggregateOutputType | null;
};
export type GetCommitteeMemberGroupByPayload<T extends CommitteeMemberGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<CommitteeMemberGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof CommitteeMemberGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], CommitteeMemberGroupByOutputType[P]> : Prisma.GetScalarType<T[P], CommitteeMemberGroupByOutputType[P]>;
}>>;
export type CommitteeMemberWhereInput = {
    AND?: Prisma.CommitteeMemberWhereInput | Prisma.CommitteeMemberWhereInput[];
    OR?: Prisma.CommitteeMemberWhereInput[];
    NOT?: Prisma.CommitteeMemberWhereInput | Prisma.CommitteeMemberWhereInput[];
    id?: Prisma.StringFilter<"CommitteeMember"> | string;
    fullName?: Prisma.StringFilter<"CommitteeMember"> | string;
    position?: Prisma.StringFilter<"CommitteeMember"> | string;
    biography?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    photoKey?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    displayOrder?: Prisma.IntFilter<"CommitteeMember"> | number;
    status?: Prisma.EnumPublicationStatusFilter<"CommitteeMember"> | $Enums.PublicationStatus;
    provinceId?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"CommitteeMember"> | Date | string | null;
    province?: Prisma.XOR<Prisma.ProvinceNullableScalarRelationFilter, Prisma.ProvinceWhereInput> | null;
};
export type CommitteeMemberOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    biography?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.ProvinceOrderByWithRelationInput;
};
export type CommitteeMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.CommitteeMemberWhereInput | Prisma.CommitteeMemberWhereInput[];
    OR?: Prisma.CommitteeMemberWhereInput[];
    NOT?: Prisma.CommitteeMemberWhereInput | Prisma.CommitteeMemberWhereInput[];
    fullName?: Prisma.StringFilter<"CommitteeMember"> | string;
    position?: Prisma.StringFilter<"CommitteeMember"> | string;
    biography?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    photoKey?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    displayOrder?: Prisma.IntFilter<"CommitteeMember"> | number;
    status?: Prisma.EnumPublicationStatusFilter<"CommitteeMember"> | $Enums.PublicationStatus;
    provinceId?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"CommitteeMember"> | Date | string | null;
    province?: Prisma.XOR<Prisma.ProvinceNullableScalarRelationFilter, Prisma.ProvinceWhereInput> | null;
}, "id">;
export type CommitteeMemberOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    biography?: Prisma.SortOrderInput | Prisma.SortOrder;
    photoKey?: Prisma.SortOrderInput | Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.CommitteeMemberCountOrderByAggregateInput;
    _avg?: Prisma.CommitteeMemberAvgOrderByAggregateInput;
    _max?: Prisma.CommitteeMemberMaxOrderByAggregateInput;
    _min?: Prisma.CommitteeMemberMinOrderByAggregateInput;
    _sum?: Prisma.CommitteeMemberSumOrderByAggregateInput;
};
export type CommitteeMemberScalarWhereWithAggregatesInput = {
    AND?: Prisma.CommitteeMemberScalarWhereWithAggregatesInput | Prisma.CommitteeMemberScalarWhereWithAggregatesInput[];
    OR?: Prisma.CommitteeMemberScalarWhereWithAggregatesInput[];
    NOT?: Prisma.CommitteeMemberScalarWhereWithAggregatesInput | Prisma.CommitteeMemberScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"CommitteeMember"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"CommitteeMember"> | string;
    position?: Prisma.StringWithAggregatesFilter<"CommitteeMember"> | string;
    biography?: Prisma.StringNullableWithAggregatesFilter<"CommitteeMember"> | string | null;
    photoKey?: Prisma.StringNullableWithAggregatesFilter<"CommitteeMember"> | string | null;
    displayOrder?: Prisma.IntWithAggregatesFilter<"CommitteeMember"> | number;
    status?: Prisma.EnumPublicationStatusWithAggregatesFilter<"CommitteeMember"> | $Enums.PublicationStatus;
    provinceId?: Prisma.StringNullableWithAggregatesFilter<"CommitteeMember"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"CommitteeMember"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"CommitteeMember"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"CommitteeMember"> | Date | string | null;
};
export type CommitteeMemberCreateInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
    province?: Prisma.ProvinceCreateNestedOneWithoutCommitteeMembersInput;
};
export type CommitteeMemberUncheckedCreateInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    provinceId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type CommitteeMemberUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    province?: Prisma.ProvinceUpdateOneWithoutCommitteeMembersNestedInput;
};
export type CommitteeMemberUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberCreateManyInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    provinceId?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type CommitteeMemberUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberListRelationFilter = {
    every?: Prisma.CommitteeMemberWhereInput;
    some?: Prisma.CommitteeMemberWhereInput;
    none?: Prisma.CommitteeMemberWhereInput;
};
export type CommitteeMemberOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type CommitteeMemberCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    biography?: Prisma.SortOrder;
    photoKey?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type CommitteeMemberAvgOrderByAggregateInput = {
    displayOrder?: Prisma.SortOrder;
};
export type CommitteeMemberMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    biography?: Prisma.SortOrder;
    photoKey?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type CommitteeMemberMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    position?: Prisma.SortOrder;
    biography?: Prisma.SortOrder;
    photoKey?: Prisma.SortOrder;
    displayOrder?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publishedAt?: Prisma.SortOrder;
};
export type CommitteeMemberSumOrderByAggregateInput = {
    displayOrder?: Prisma.SortOrder;
};
export type CommitteeMemberCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput> | Prisma.CommitteeMemberCreateWithoutProvinceInput[] | Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput | Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.CommitteeMemberCreateManyProvinceInputEnvelope;
    connect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
};
export type CommitteeMemberUncheckedCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput> | Prisma.CommitteeMemberCreateWithoutProvinceInput[] | Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput | Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.CommitteeMemberCreateManyProvinceInputEnvelope;
    connect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
};
export type CommitteeMemberUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput> | Prisma.CommitteeMemberCreateWithoutProvinceInput[] | Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput | Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.CommitteeMemberUpsertWithWhereUniqueWithoutProvinceInput | Prisma.CommitteeMemberUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.CommitteeMemberCreateManyProvinceInputEnvelope;
    set?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    disconnect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    delete?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    connect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    update?: Prisma.CommitteeMemberUpdateWithWhereUniqueWithoutProvinceInput | Prisma.CommitteeMemberUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.CommitteeMemberUpdateManyWithWhereWithoutProvinceInput | Prisma.CommitteeMemberUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.CommitteeMemberScalarWhereInput | Prisma.CommitteeMemberScalarWhereInput[];
};
export type CommitteeMemberUncheckedUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput> | Prisma.CommitteeMemberCreateWithoutProvinceInput[] | Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput | Prisma.CommitteeMemberCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.CommitteeMemberUpsertWithWhereUniqueWithoutProvinceInput | Prisma.CommitteeMemberUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.CommitteeMemberCreateManyProvinceInputEnvelope;
    set?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    disconnect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    delete?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    connect?: Prisma.CommitteeMemberWhereUniqueInput | Prisma.CommitteeMemberWhereUniqueInput[];
    update?: Prisma.CommitteeMemberUpdateWithWhereUniqueWithoutProvinceInput | Prisma.CommitteeMemberUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.CommitteeMemberUpdateManyWithWhereWithoutProvinceInput | Prisma.CommitteeMemberUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.CommitteeMemberScalarWhereInput | Prisma.CommitteeMemberScalarWhereInput[];
};
export type CommitteeMemberCreateWithoutProvinceInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type CommitteeMemberUncheckedCreateWithoutProvinceInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type CommitteeMemberCreateOrConnectWithoutProvinceInput = {
    where: Prisma.CommitteeMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput>;
};
export type CommitteeMemberCreateManyProvinceInputEnvelope = {
    data: Prisma.CommitteeMemberCreateManyProvinceInput | Prisma.CommitteeMemberCreateManyProvinceInput[];
    skipDuplicates?: boolean;
};
export type CommitteeMemberUpsertWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.CommitteeMemberWhereUniqueInput;
    update: Prisma.XOR<Prisma.CommitteeMemberUpdateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedUpdateWithoutProvinceInput>;
    create: Prisma.XOR<Prisma.CommitteeMemberCreateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedCreateWithoutProvinceInput>;
};
export type CommitteeMemberUpdateWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.CommitteeMemberWhereUniqueInput;
    data: Prisma.XOR<Prisma.CommitteeMemberUpdateWithoutProvinceInput, Prisma.CommitteeMemberUncheckedUpdateWithoutProvinceInput>;
};
export type CommitteeMemberUpdateManyWithWhereWithoutProvinceInput = {
    where: Prisma.CommitteeMemberScalarWhereInput;
    data: Prisma.XOR<Prisma.CommitteeMemberUpdateManyMutationInput, Prisma.CommitteeMemberUncheckedUpdateManyWithoutProvinceInput>;
};
export type CommitteeMemberScalarWhereInput = {
    AND?: Prisma.CommitteeMemberScalarWhereInput | Prisma.CommitteeMemberScalarWhereInput[];
    OR?: Prisma.CommitteeMemberScalarWhereInput[];
    NOT?: Prisma.CommitteeMemberScalarWhereInput | Prisma.CommitteeMemberScalarWhereInput[];
    id?: Prisma.StringFilter<"CommitteeMember"> | string;
    fullName?: Prisma.StringFilter<"CommitteeMember"> | string;
    position?: Prisma.StringFilter<"CommitteeMember"> | string;
    biography?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    photoKey?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    displayOrder?: Prisma.IntFilter<"CommitteeMember"> | number;
    status?: Prisma.EnumPublicationStatusFilter<"CommitteeMember"> | $Enums.PublicationStatus;
    provinceId?: Prisma.StringNullableFilter<"CommitteeMember"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"CommitteeMember"> | Date | string;
    publishedAt?: Prisma.DateTimeNullableFilter<"CommitteeMember"> | Date | string | null;
};
export type CommitteeMemberCreateManyProvinceInput = {
    id?: string;
    fullName: string;
    position: string;
    biography?: string | null;
    photoKey?: string | null;
    displayOrder?: number;
    status?: $Enums.PublicationStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publishedAt?: Date | string | null;
};
export type CommitteeMemberUpdateWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberUncheckedUpdateWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberUncheckedUpdateManyWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    position?: Prisma.StringFieldUpdateOperationsInput | string;
    biography?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    photoKey?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    displayOrder?: Prisma.IntFieldUpdateOperationsInput | number;
    status?: Prisma.EnumPublicationStatusFieldUpdateOperationsInput | $Enums.PublicationStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publishedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type CommitteeMemberSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    position?: boolean;
    biography?: boolean;
    photoKey?: boolean;
    displayOrder?: boolean;
    status?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
}, ExtArgs["result"]["committeeMember"]>;
export type CommitteeMemberSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    position?: boolean;
    biography?: boolean;
    photoKey?: boolean;
    displayOrder?: boolean;
    status?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
}, ExtArgs["result"]["committeeMember"]>;
export type CommitteeMemberSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    position?: boolean;
    biography?: boolean;
    photoKey?: boolean;
    displayOrder?: boolean;
    status?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
}, ExtArgs["result"]["committeeMember"]>;
export type CommitteeMemberSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    position?: boolean;
    biography?: boolean;
    photoKey?: boolean;
    displayOrder?: boolean;
    status?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publishedAt?: boolean;
};
export type CommitteeMemberOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "position" | "biography" | "photoKey" | "displayOrder" | "status" | "provinceId" | "createdAt" | "updatedAt" | "publishedAt", ExtArgs["result"]["committeeMember"]>;
export type CommitteeMemberInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
};
export type CommitteeMemberIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
};
export type CommitteeMemberIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.CommitteeMember$provinceArgs<ExtArgs>;
};
export type $CommitteeMemberPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "CommitteeMember";
    objects: {
        province: Prisma.$ProvincePayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        position: string;
        biography: string | null;
        photoKey: string | null;
        displayOrder: number;
        status: $Enums.PublicationStatus;
        provinceId: string | null;
        createdAt: Date;
        updatedAt: Date;
        publishedAt: Date | null;
    }, ExtArgs["result"]["committeeMember"]>;
    composites: {};
};
export type CommitteeMemberGetPayload<S extends boolean | null | undefined | CommitteeMemberDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload, S>;
export type CommitteeMemberCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<CommitteeMemberFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: CommitteeMemberCountAggregateInputType | true;
};
export interface CommitteeMemberDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['CommitteeMember'];
        meta: {
            name: 'CommitteeMember';
        };
    };
    findUnique<T extends CommitteeMemberFindUniqueArgs>(args: Prisma.SelectSubset<T, CommitteeMemberFindUniqueArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends CommitteeMemberFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, CommitteeMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends CommitteeMemberFindFirstArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberFindFirstArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends CommitteeMemberFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends CommitteeMemberFindManyArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends CommitteeMemberCreateArgs>(args: Prisma.SelectSubset<T, CommitteeMemberCreateArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends CommitteeMemberCreateManyArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends CommitteeMemberCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends CommitteeMemberDeleteArgs>(args: Prisma.SelectSubset<T, CommitteeMemberDeleteArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends CommitteeMemberUpdateArgs>(args: Prisma.SelectSubset<T, CommitteeMemberUpdateArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends CommitteeMemberDeleteManyArgs>(args?: Prisma.SelectSubset<T, CommitteeMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends CommitteeMemberUpdateManyArgs>(args: Prisma.SelectSubset<T, CommitteeMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends CommitteeMemberUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, CommitteeMemberUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends CommitteeMemberUpsertArgs>(args: Prisma.SelectSubset<T, CommitteeMemberUpsertArgs<ExtArgs>>): Prisma.Prisma__CommitteeMemberClient<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends CommitteeMemberCountArgs>(args?: Prisma.Subset<T, CommitteeMemberCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], CommitteeMemberCountAggregateOutputType> : number>;
    aggregate<T extends CommitteeMemberAggregateArgs>(args: Prisma.Subset<T, CommitteeMemberAggregateArgs>): Prisma.PrismaPromise<GetCommitteeMemberAggregateType<T>>;
    groupBy<T extends CommitteeMemberGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: CommitteeMemberGroupByArgs['orderBy'];
    } : {
        orderBy?: CommitteeMemberGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, CommitteeMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCommitteeMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: CommitteeMemberFieldRefs;
}
export interface Prisma__CommitteeMemberClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    province<T extends Prisma.CommitteeMember$provinceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CommitteeMember$provinceArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface CommitteeMemberFieldRefs {
    readonly id: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly fullName: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly position: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly biography: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly photoKey: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly displayOrder: Prisma.FieldRef<"CommitteeMember", 'Int'>;
    readonly status: Prisma.FieldRef<"CommitteeMember", 'PublicationStatus'>;
    readonly provinceId: Prisma.FieldRef<"CommitteeMember", 'String'>;
    readonly createdAt: Prisma.FieldRef<"CommitteeMember", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"CommitteeMember", 'DateTime'>;
    readonly publishedAt: Prisma.FieldRef<"CommitteeMember", 'DateTime'>;
}
export type CommitteeMemberFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where: Prisma.CommitteeMemberWhereUniqueInput;
};
export type CommitteeMemberFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where: Prisma.CommitteeMemberWhereUniqueInput;
};
export type CommitteeMemberFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where?: Prisma.CommitteeMemberWhereInput;
    orderBy?: Prisma.CommitteeMemberOrderByWithRelationInput | Prisma.CommitteeMemberOrderByWithRelationInput[];
    cursor?: Prisma.CommitteeMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommitteeMemberScalarFieldEnum | Prisma.CommitteeMemberScalarFieldEnum[];
};
export type CommitteeMemberFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where?: Prisma.CommitteeMemberWhereInput;
    orderBy?: Prisma.CommitteeMemberOrderByWithRelationInput | Prisma.CommitteeMemberOrderByWithRelationInput[];
    cursor?: Prisma.CommitteeMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommitteeMemberScalarFieldEnum | Prisma.CommitteeMemberScalarFieldEnum[];
};
export type CommitteeMemberFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where?: Prisma.CommitteeMemberWhereInput;
    orderBy?: Prisma.CommitteeMemberOrderByWithRelationInput | Prisma.CommitteeMemberOrderByWithRelationInput[];
    cursor?: Prisma.CommitteeMemberWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.CommitteeMemberScalarFieldEnum | Prisma.CommitteeMemberScalarFieldEnum[];
};
export type CommitteeMemberCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommitteeMemberCreateInput, Prisma.CommitteeMemberUncheckedCreateInput>;
};
export type CommitteeMemberCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.CommitteeMemberCreateManyInput | Prisma.CommitteeMemberCreateManyInput[];
    skipDuplicates?: boolean;
};
export type CommitteeMemberCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    data: Prisma.CommitteeMemberCreateManyInput | Prisma.CommitteeMemberCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.CommitteeMemberIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type CommitteeMemberUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommitteeMemberUpdateInput, Prisma.CommitteeMemberUncheckedUpdateInput>;
    where: Prisma.CommitteeMemberWhereUniqueInput;
};
export type CommitteeMemberUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.CommitteeMemberUpdateManyMutationInput, Prisma.CommitteeMemberUncheckedUpdateManyInput>;
    where?: Prisma.CommitteeMemberWhereInput;
    limit?: number;
};
export type CommitteeMemberUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.CommitteeMemberUpdateManyMutationInput, Prisma.CommitteeMemberUncheckedUpdateManyInput>;
    where?: Prisma.CommitteeMemberWhereInput;
    limit?: number;
    include?: Prisma.CommitteeMemberIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type CommitteeMemberUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where: Prisma.CommitteeMemberWhereUniqueInput;
    create: Prisma.XOR<Prisma.CommitteeMemberCreateInput, Prisma.CommitteeMemberUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.CommitteeMemberUpdateInput, Prisma.CommitteeMemberUncheckedUpdateInput>;
};
export type CommitteeMemberDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
    where: Prisma.CommitteeMemberWhereUniqueInput;
};
export type CommitteeMemberDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommitteeMemberWhereInput;
    limit?: number;
};
export type CommitteeMember$provinceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where?: Prisma.ProvinceWhereInput;
};
export type CommitteeMemberDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.CommitteeMemberSelect<ExtArgs> | null;
    omit?: Prisma.CommitteeMemberOmit<ExtArgs> | null;
    include?: Prisma.CommitteeMemberInclude<ExtArgs> | null;
};
