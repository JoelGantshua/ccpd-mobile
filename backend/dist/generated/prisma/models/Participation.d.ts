import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ParticipationModel = runtime.Types.Result.DefaultSelection<Prisma.$ParticipationPayload>;
export type AggregateParticipation = {
    _count: ParticipationCountAggregateOutputType | null;
    _min: ParticipationMinAggregateOutputType | null;
    _max: ParticipationMaxAggregateOutputType | null;
};
export type ParticipationMinAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    motivation: string | null;
    status: $Enums.ParticipationStatus | null;
    emailVerifiedAt: Date | null;
    provinceId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ParticipationMaxAggregateOutputType = {
    id: string | null;
    fullName: string | null;
    email: string | null;
    phone: string | null;
    motivation: string | null;
    status: $Enums.ParticipationStatus | null;
    emailVerifiedAt: Date | null;
    provinceId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ParticipationCountAggregateOutputType = {
    id: number;
    fullName: number;
    email: number;
    phone: number;
    motivation: number;
    status: number;
    emailVerifiedAt: number;
    provinceId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ParticipationMinAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    motivation?: true;
    status?: true;
    emailVerifiedAt?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ParticipationMaxAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    motivation?: true;
    status?: true;
    emailVerifiedAt?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ParticipationCountAggregateInputType = {
    id?: true;
    fullName?: true;
    email?: true;
    phone?: true;
    motivation?: true;
    status?: true;
    emailVerifiedAt?: true;
    provinceId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ParticipationAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticipationWhereInput;
    orderBy?: Prisma.ParticipationOrderByWithRelationInput | Prisma.ParticipationOrderByWithRelationInput[];
    cursor?: Prisma.ParticipationWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ParticipationCountAggregateInputType;
    _min?: ParticipationMinAggregateInputType;
    _max?: ParticipationMaxAggregateInputType;
};
export type GetParticipationAggregateType<T extends ParticipationAggregateArgs> = {
    [P in keyof T & keyof AggregateParticipation]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateParticipation[P]> : Prisma.GetScalarType<T[P], AggregateParticipation[P]>;
};
export type ParticipationGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticipationWhereInput;
    orderBy?: Prisma.ParticipationOrderByWithAggregationInput | Prisma.ParticipationOrderByWithAggregationInput[];
    by: Prisma.ParticipationScalarFieldEnum[] | Prisma.ParticipationScalarFieldEnum;
    having?: Prisma.ParticipationScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ParticipationCountAggregateInputType | true;
    _min?: ParticipationMinAggregateInputType;
    _max?: ParticipationMaxAggregateInputType;
};
export type ParticipationGroupByOutputType = {
    id: string;
    fullName: string;
    email: string;
    phone: string | null;
    motivation: string;
    status: $Enums.ParticipationStatus;
    emailVerifiedAt: Date | null;
    provinceId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ParticipationCountAggregateOutputType | null;
    _min: ParticipationMinAggregateOutputType | null;
    _max: ParticipationMaxAggregateOutputType | null;
};
export type GetParticipationGroupByPayload<T extends ParticipationGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ParticipationGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ParticipationGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ParticipationGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ParticipationGroupByOutputType[P]>;
}>>;
export type ParticipationWhereInput = {
    AND?: Prisma.ParticipationWhereInput | Prisma.ParticipationWhereInput[];
    OR?: Prisma.ParticipationWhereInput[];
    NOT?: Prisma.ParticipationWhereInput | Prisma.ParticipationWhereInput[];
    id?: Prisma.StringFilter<"Participation"> | string;
    fullName?: Prisma.StringFilter<"Participation"> | string;
    email?: Prisma.StringFilter<"Participation"> | string;
    phone?: Prisma.StringNullableFilter<"Participation"> | string | null;
    motivation?: Prisma.StringFilter<"Participation"> | string;
    status?: Prisma.EnumParticipationStatusFilter<"Participation"> | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"Participation"> | Date | string | null;
    provinceId?: Prisma.StringFilter<"Participation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
    province?: Prisma.XOR<Prisma.ProvinceScalarRelationFilter, Prisma.ProvinceWhereInput>;
};
export type ParticipationOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    motivation?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    province?: Prisma.ProvinceOrderByWithRelationInput;
};
export type ParticipationWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ParticipationWhereInput | Prisma.ParticipationWhereInput[];
    OR?: Prisma.ParticipationWhereInput[];
    NOT?: Prisma.ParticipationWhereInput | Prisma.ParticipationWhereInput[];
    fullName?: Prisma.StringFilter<"Participation"> | string;
    email?: Prisma.StringFilter<"Participation"> | string;
    phone?: Prisma.StringNullableFilter<"Participation"> | string | null;
    motivation?: Prisma.StringFilter<"Participation"> | string;
    status?: Prisma.EnumParticipationStatusFilter<"Participation"> | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"Participation"> | Date | string | null;
    provinceId?: Prisma.StringFilter<"Participation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
    province?: Prisma.XOR<Prisma.ProvinceScalarRelationFilter, Prisma.ProvinceWhereInput>;
}, "id">;
export type ParticipationOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrderInput | Prisma.SortOrder;
    motivation?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ParticipationCountOrderByAggregateInput;
    _max?: Prisma.ParticipationMaxOrderByAggregateInput;
    _min?: Prisma.ParticipationMinOrderByAggregateInput;
};
export type ParticipationScalarWhereWithAggregatesInput = {
    AND?: Prisma.ParticipationScalarWhereWithAggregatesInput | Prisma.ParticipationScalarWhereWithAggregatesInput[];
    OR?: Prisma.ParticipationScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ParticipationScalarWhereWithAggregatesInput | Prisma.ParticipationScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Participation"> | string;
    fullName?: Prisma.StringWithAggregatesFilter<"Participation"> | string;
    email?: Prisma.StringWithAggregatesFilter<"Participation"> | string;
    phone?: Prisma.StringNullableWithAggregatesFilter<"Participation"> | string | null;
    motivation?: Prisma.StringWithAggregatesFilter<"Participation"> | string;
    status?: Prisma.EnumParticipationStatusWithAggregatesFilter<"Participation"> | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Participation"> | Date | string | null;
    provinceId?: Prisma.StringWithAggregatesFilter<"Participation"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Participation"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Participation"> | Date | string;
};
export type ParticipationCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    province: Prisma.ProvinceCreateNestedOneWithoutParticipationsInput;
};
export type ParticipationUncheckedCreateInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    provinceId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticipationUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    province?: Prisma.ProvinceUpdateOneRequiredWithoutParticipationsNestedInput;
};
export type ParticipationUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    provinceId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationCreateManyInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    provinceId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticipationUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    provinceId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationListRelationFilter = {
    every?: Prisma.ParticipationWhereInput;
    some?: Prisma.ParticipationWhereInput;
    none?: Prisma.ParticipationWhereInput;
};
export type ParticipationOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ParticipationCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    motivation?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticipationMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    motivation?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticipationMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    fullName?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    phone?: Prisma.SortOrder;
    motivation?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    emailVerifiedAt?: Prisma.SortOrder;
    provinceId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ParticipationCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput> | Prisma.ParticipationCreateWithoutProvinceInput[] | Prisma.ParticipationUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.ParticipationCreateOrConnectWithoutProvinceInput | Prisma.ParticipationCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.ParticipationCreateManyProvinceInputEnvelope;
    connect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
};
export type ParticipationUncheckedCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput> | Prisma.ParticipationCreateWithoutProvinceInput[] | Prisma.ParticipationUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.ParticipationCreateOrConnectWithoutProvinceInput | Prisma.ParticipationCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.ParticipationCreateManyProvinceInputEnvelope;
    connect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
};
export type ParticipationUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput> | Prisma.ParticipationCreateWithoutProvinceInput[] | Prisma.ParticipationUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.ParticipationCreateOrConnectWithoutProvinceInput | Prisma.ParticipationCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.ParticipationUpsertWithWhereUniqueWithoutProvinceInput | Prisma.ParticipationUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.ParticipationCreateManyProvinceInputEnvelope;
    set?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    disconnect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    delete?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    connect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    update?: Prisma.ParticipationUpdateWithWhereUniqueWithoutProvinceInput | Prisma.ParticipationUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.ParticipationUpdateManyWithWhereWithoutProvinceInput | Prisma.ParticipationUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.ParticipationScalarWhereInput | Prisma.ParticipationScalarWhereInput[];
};
export type ParticipationUncheckedUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput> | Prisma.ParticipationCreateWithoutProvinceInput[] | Prisma.ParticipationUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.ParticipationCreateOrConnectWithoutProvinceInput | Prisma.ParticipationCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.ParticipationUpsertWithWhereUniqueWithoutProvinceInput | Prisma.ParticipationUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.ParticipationCreateManyProvinceInputEnvelope;
    set?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    disconnect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    delete?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    connect?: Prisma.ParticipationWhereUniqueInput | Prisma.ParticipationWhereUniqueInput[];
    update?: Prisma.ParticipationUpdateWithWhereUniqueWithoutProvinceInput | Prisma.ParticipationUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.ParticipationUpdateManyWithWhereWithoutProvinceInput | Prisma.ParticipationUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.ParticipationScalarWhereInput | Prisma.ParticipationScalarWhereInput[];
};
export type EnumParticipationStatusFieldUpdateOperationsInput = {
    set?: $Enums.ParticipationStatus;
};
export type ParticipationCreateWithoutProvinceInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticipationUncheckedCreateWithoutProvinceInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticipationCreateOrConnectWithoutProvinceInput = {
    where: Prisma.ParticipationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput>;
};
export type ParticipationCreateManyProvinceInputEnvelope = {
    data: Prisma.ParticipationCreateManyProvinceInput | Prisma.ParticipationCreateManyProvinceInput[];
    skipDuplicates?: boolean;
};
export type ParticipationUpsertWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.ParticipationWhereUniqueInput;
    update: Prisma.XOR<Prisma.ParticipationUpdateWithoutProvinceInput, Prisma.ParticipationUncheckedUpdateWithoutProvinceInput>;
    create: Prisma.XOR<Prisma.ParticipationCreateWithoutProvinceInput, Prisma.ParticipationUncheckedCreateWithoutProvinceInput>;
};
export type ParticipationUpdateWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.ParticipationWhereUniqueInput;
    data: Prisma.XOR<Prisma.ParticipationUpdateWithoutProvinceInput, Prisma.ParticipationUncheckedUpdateWithoutProvinceInput>;
};
export type ParticipationUpdateManyWithWhereWithoutProvinceInput = {
    where: Prisma.ParticipationScalarWhereInput;
    data: Prisma.XOR<Prisma.ParticipationUpdateManyMutationInput, Prisma.ParticipationUncheckedUpdateManyWithoutProvinceInput>;
};
export type ParticipationScalarWhereInput = {
    AND?: Prisma.ParticipationScalarWhereInput | Prisma.ParticipationScalarWhereInput[];
    OR?: Prisma.ParticipationScalarWhereInput[];
    NOT?: Prisma.ParticipationScalarWhereInput | Prisma.ParticipationScalarWhereInput[];
    id?: Prisma.StringFilter<"Participation"> | string;
    fullName?: Prisma.StringFilter<"Participation"> | string;
    email?: Prisma.StringFilter<"Participation"> | string;
    phone?: Prisma.StringNullableFilter<"Participation"> | string | null;
    motivation?: Prisma.StringFilter<"Participation"> | string;
    status?: Prisma.EnumParticipationStatusFilter<"Participation"> | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.DateTimeNullableFilter<"Participation"> | Date | string | null;
    provinceId?: Prisma.StringFilter<"Participation"> | string;
    createdAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Participation"> | Date | string;
};
export type ParticipationCreateManyProvinceInput = {
    id?: string;
    fullName: string;
    email: string;
    phone?: string | null;
    motivation: string;
    status?: $Enums.ParticipationStatus;
    emailVerifiedAt?: Date | string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ParticipationUpdateWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationUncheckedUpdateWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationUncheckedUpdateManyWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    fullName?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    phone?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    motivation?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumParticipationStatusFieldUpdateOperationsInput | $Enums.ParticipationStatus;
    emailVerifiedAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ParticipationSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    motivation?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["participation"]>;
export type ParticipationSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    motivation?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["participation"]>;
export type ParticipationSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    motivation?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["participation"]>;
export type ParticipationSelectScalar = {
    id?: boolean;
    fullName?: boolean;
    email?: boolean;
    phone?: boolean;
    motivation?: boolean;
    status?: boolean;
    emailVerifiedAt?: boolean;
    provinceId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ParticipationOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "fullName" | "email" | "phone" | "motivation" | "status" | "emailVerifiedAt" | "provinceId" | "createdAt" | "updatedAt", ExtArgs["result"]["participation"]>;
export type ParticipationInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
};
export type ParticipationIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
};
export type ParticipationIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.ProvinceDefaultArgs<ExtArgs>;
};
export type $ParticipationPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Participation";
    objects: {
        province: Prisma.$ProvincePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        fullName: string;
        email: string;
        phone: string | null;
        motivation: string;
        status: $Enums.ParticipationStatus;
        emailVerifiedAt: Date | null;
        provinceId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["participation"]>;
    composites: {};
};
export type ParticipationGetPayload<S extends boolean | null | undefined | ParticipationDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ParticipationPayload, S>;
export type ParticipationCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ParticipationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ParticipationCountAggregateInputType | true;
};
export interface ParticipationDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Participation'];
        meta: {
            name: 'Participation';
        };
    };
    findUnique<T extends ParticipationFindUniqueArgs>(args: Prisma.SelectSubset<T, ParticipationFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ParticipationFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ParticipationFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ParticipationFindFirstArgs>(args?: Prisma.SelectSubset<T, ParticipationFindFirstArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ParticipationFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ParticipationFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ParticipationFindManyArgs>(args?: Prisma.SelectSubset<T, ParticipationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ParticipationCreateArgs>(args: Prisma.SelectSubset<T, ParticipationCreateArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ParticipationCreateManyArgs>(args?: Prisma.SelectSubset<T, ParticipationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ParticipationCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ParticipationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ParticipationDeleteArgs>(args: Prisma.SelectSubset<T, ParticipationDeleteArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ParticipationUpdateArgs>(args: Prisma.SelectSubset<T, ParticipationUpdateArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ParticipationDeleteManyArgs>(args?: Prisma.SelectSubset<T, ParticipationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ParticipationUpdateManyArgs>(args: Prisma.SelectSubset<T, ParticipationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ParticipationUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ParticipationUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ParticipationUpsertArgs>(args: Prisma.SelectSubset<T, ParticipationUpsertArgs<ExtArgs>>): Prisma.Prisma__ParticipationClient<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ParticipationCountArgs>(args?: Prisma.Subset<T, ParticipationCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ParticipationCountAggregateOutputType> : number>;
    aggregate<T extends ParticipationAggregateArgs>(args: Prisma.Subset<T, ParticipationAggregateArgs>): Prisma.PrismaPromise<GetParticipationAggregateType<T>>;
    groupBy<T extends ParticipationGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ParticipationGroupByArgs['orderBy'];
    } : {
        orderBy?: ParticipationGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ParticipationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetParticipationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ParticipationFieldRefs;
}
export interface Prisma__ParticipationClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    province<T extends Prisma.ProvinceDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ProvinceDefaultArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ParticipationFieldRefs {
    readonly id: Prisma.FieldRef<"Participation", 'String'>;
    readonly fullName: Prisma.FieldRef<"Participation", 'String'>;
    readonly email: Prisma.FieldRef<"Participation", 'String'>;
    readonly phone: Prisma.FieldRef<"Participation", 'String'>;
    readonly motivation: Prisma.FieldRef<"Participation", 'String'>;
    readonly status: Prisma.FieldRef<"Participation", 'ParticipationStatus'>;
    readonly emailVerifiedAt: Prisma.FieldRef<"Participation", 'DateTime'>;
    readonly provinceId: Prisma.FieldRef<"Participation", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Participation", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Participation", 'DateTime'>;
}
export type ParticipationFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where: Prisma.ParticipationWhereUniqueInput;
};
export type ParticipationFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where: Prisma.ParticipationWhereUniqueInput;
};
export type ParticipationFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where?: Prisma.ParticipationWhereInput;
    orderBy?: Prisma.ParticipationOrderByWithRelationInput | Prisma.ParticipationOrderByWithRelationInput[];
    cursor?: Prisma.ParticipationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticipationScalarFieldEnum | Prisma.ParticipationScalarFieldEnum[];
};
export type ParticipationFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where?: Prisma.ParticipationWhereInput;
    orderBy?: Prisma.ParticipationOrderByWithRelationInput | Prisma.ParticipationOrderByWithRelationInput[];
    cursor?: Prisma.ParticipationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticipationScalarFieldEnum | Prisma.ParticipationScalarFieldEnum[];
};
export type ParticipationFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where?: Prisma.ParticipationWhereInput;
    orderBy?: Prisma.ParticipationOrderByWithRelationInput | Prisma.ParticipationOrderByWithRelationInput[];
    cursor?: Prisma.ParticipationWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ParticipationScalarFieldEnum | Prisma.ParticipationScalarFieldEnum[];
};
export type ParticipationCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticipationCreateInput, Prisma.ParticipationUncheckedCreateInput>;
};
export type ParticipationCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ParticipationCreateManyInput | Prisma.ParticipationCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ParticipationCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    data: Prisma.ParticipationCreateManyInput | Prisma.ParticipationCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.ParticipationIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type ParticipationUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticipationUpdateInput, Prisma.ParticipationUncheckedUpdateInput>;
    where: Prisma.ParticipationWhereUniqueInput;
};
export type ParticipationUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ParticipationUpdateManyMutationInput, Prisma.ParticipationUncheckedUpdateManyInput>;
    where?: Prisma.ParticipationWhereInput;
    limit?: number;
};
export type ParticipationUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ParticipationUpdateManyMutationInput, Prisma.ParticipationUncheckedUpdateManyInput>;
    where?: Prisma.ParticipationWhereInput;
    limit?: number;
    include?: Prisma.ParticipationIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type ParticipationUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where: Prisma.ParticipationWhereUniqueInput;
    create: Prisma.XOR<Prisma.ParticipationCreateInput, Prisma.ParticipationUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ParticipationUpdateInput, Prisma.ParticipationUncheckedUpdateInput>;
};
export type ParticipationDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
    where: Prisma.ParticipationWhereUniqueInput;
};
export type ParticipationDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticipationWhereInput;
    limit?: number;
};
export type ParticipationDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ParticipationSelect<ExtArgs> | null;
    omit?: Prisma.ParticipationOmit<ExtArgs> | null;
    include?: Prisma.ParticipationInclude<ExtArgs> | null;
};
