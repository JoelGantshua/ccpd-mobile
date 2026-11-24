import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type OpinionModel = runtime.Types.Result.DefaultSelection<Prisma.$OpinionPayload>;
export type AggregateOpinion = {
    _count: OpinionCountAggregateOutputType | null;
    _min: OpinionMinAggregateOutputType | null;
    _max: OpinionMaxAggregateOutputType | null;
};
export type OpinionMinAggregateOutputType = {
    provinceId: string | null;
    authorId: string | null;
    id: string | null;
    authorName: string | null;
    isAnonymous: boolean | null;
    content: string | null;
    status: $Enums.OpinionStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publicationId: string | null;
};
export type OpinionMaxAggregateOutputType = {
    provinceId: string | null;
    authorId: string | null;
    id: string | null;
    authorName: string | null;
    isAnonymous: boolean | null;
    content: string | null;
    status: $Enums.OpinionStatus | null;
    createdAt: Date | null;
    updatedAt: Date | null;
    publicationId: string | null;
};
export type OpinionCountAggregateOutputType = {
    provinceId: number;
    authorId: number;
    id: number;
    authorName: number;
    isAnonymous: number;
    content: number;
    status: number;
    createdAt: number;
    updatedAt: number;
    publicationId: number;
    _all: number;
};
export type OpinionMinAggregateInputType = {
    provinceId?: true;
    authorId?: true;
    id?: true;
    authorName?: true;
    isAnonymous?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    publicationId?: true;
};
export type OpinionMaxAggregateInputType = {
    provinceId?: true;
    authorId?: true;
    id?: true;
    authorName?: true;
    isAnonymous?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    publicationId?: true;
};
export type OpinionCountAggregateInputType = {
    provinceId?: true;
    authorId?: true;
    id?: true;
    authorName?: true;
    isAnonymous?: true;
    content?: true;
    status?: true;
    createdAt?: true;
    updatedAt?: true;
    publicationId?: true;
    _all?: true;
};
export type OpinionAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpinionWhereInput;
    orderBy?: Prisma.OpinionOrderByWithRelationInput | Prisma.OpinionOrderByWithRelationInput[];
    cursor?: Prisma.OpinionWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | OpinionCountAggregateInputType;
    _min?: OpinionMinAggregateInputType;
    _max?: OpinionMaxAggregateInputType;
};
export type GetOpinionAggregateType<T extends OpinionAggregateArgs> = {
    [P in keyof T & keyof AggregateOpinion]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateOpinion[P]> : Prisma.GetScalarType<T[P], AggregateOpinion[P]>;
};
export type OpinionGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpinionWhereInput;
    orderBy?: Prisma.OpinionOrderByWithAggregationInput | Prisma.OpinionOrderByWithAggregationInput[];
    by: Prisma.OpinionScalarFieldEnum[] | Prisma.OpinionScalarFieldEnum;
    having?: Prisma.OpinionScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: OpinionCountAggregateInputType | true;
    _min?: OpinionMinAggregateInputType;
    _max?: OpinionMaxAggregateInputType;
};
export type OpinionGroupByOutputType = {
    provinceId: string | null;
    authorId: string | null;
    id: string;
    authorName: string | null;
    isAnonymous: boolean;
    content: string;
    status: $Enums.OpinionStatus;
    createdAt: Date;
    updatedAt: Date;
    publicationId: string | null;
    _count: OpinionCountAggregateOutputType | null;
    _min: OpinionMinAggregateOutputType | null;
    _max: OpinionMaxAggregateOutputType | null;
};
export type GetOpinionGroupByPayload<T extends OpinionGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<OpinionGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof OpinionGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], OpinionGroupByOutputType[P]> : Prisma.GetScalarType<T[P], OpinionGroupByOutputType[P]>;
}>>;
export type OpinionWhereInput = {
    AND?: Prisma.OpinionWhereInput | Prisma.OpinionWhereInput[];
    OR?: Prisma.OpinionWhereInput[];
    NOT?: Prisma.OpinionWhereInput | Prisma.OpinionWhereInput[];
    provinceId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    authorId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    id?: Prisma.StringFilter<"Opinion"> | string;
    authorName?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    isAnonymous?: Prisma.BoolFilter<"Opinion"> | boolean;
    content?: Prisma.StringFilter<"Opinion"> | string;
    status?: Prisma.EnumOpinionStatusFilter<"Opinion"> | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    publicationId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    province?: Prisma.XOR<Prisma.ProvinceNullableScalarRelationFilter, Prisma.ProvinceWhereInput> | null;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
};
export type OpinionOrderByWithRelationInput = {
    provinceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    authorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    isAnonymous?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    province?: Prisma.ProvinceOrderByWithRelationInput;
    author?: Prisma.UserOrderByWithRelationInput;
    publication?: Prisma.PublicationOrderByWithRelationInput;
};
export type OpinionWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.OpinionWhereInput | Prisma.OpinionWhereInput[];
    OR?: Prisma.OpinionWhereInput[];
    NOT?: Prisma.OpinionWhereInput | Prisma.OpinionWhereInput[];
    provinceId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    authorId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    authorName?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    isAnonymous?: Prisma.BoolFilter<"Opinion"> | boolean;
    content?: Prisma.StringFilter<"Opinion"> | string;
    status?: Prisma.EnumOpinionStatusFilter<"Opinion"> | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    publicationId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    province?: Prisma.XOR<Prisma.ProvinceNullableScalarRelationFilter, Prisma.ProvinceWhereInput> | null;
    author?: Prisma.XOR<Prisma.UserNullableScalarRelationFilter, Prisma.UserWhereInput> | null;
    publication?: Prisma.XOR<Prisma.PublicationNullableScalarRelationFilter, Prisma.PublicationWhereInput> | null;
}, "id">;
export type OpinionOrderByWithAggregationInput = {
    provinceId?: Prisma.SortOrderInput | Prisma.SortOrder;
    authorId?: Prisma.SortOrderInput | Prisma.SortOrder;
    id?: Prisma.SortOrder;
    authorName?: Prisma.SortOrderInput | Prisma.SortOrder;
    isAnonymous?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.OpinionCountOrderByAggregateInput;
    _max?: Prisma.OpinionMaxOrderByAggregateInput;
    _min?: Prisma.OpinionMinOrderByAggregateInput;
};
export type OpinionScalarWhereWithAggregatesInput = {
    AND?: Prisma.OpinionScalarWhereWithAggregatesInput | Prisma.OpinionScalarWhereWithAggregatesInput[];
    OR?: Prisma.OpinionScalarWhereWithAggregatesInput[];
    NOT?: Prisma.OpinionScalarWhereWithAggregatesInput | Prisma.OpinionScalarWhereWithAggregatesInput[];
    provinceId?: Prisma.StringNullableWithAggregatesFilter<"Opinion"> | string | null;
    authorId?: Prisma.StringNullableWithAggregatesFilter<"Opinion"> | string | null;
    id?: Prisma.StringWithAggregatesFilter<"Opinion"> | string;
    authorName?: Prisma.StringNullableWithAggregatesFilter<"Opinion"> | string | null;
    isAnonymous?: Prisma.BoolWithAggregatesFilter<"Opinion"> | boolean;
    content?: Prisma.StringWithAggregatesFilter<"Opinion"> | string;
    status?: Prisma.EnumOpinionStatusWithAggregatesFilter<"Opinion"> | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Opinion"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Opinion"> | Date | string;
    publicationId?: Prisma.StringNullableWithAggregatesFilter<"Opinion"> | string | null;
};
export type OpinionCreateInput = {
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    province?: Prisma.ProvinceCreateNestedOneWithoutOpinionsInput;
    author?: Prisma.UserCreateNestedOneWithoutOpinionsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutOpinionsInput;
};
export type OpinionUncheckedCreateInput = {
    provinceId?: string | null;
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    province?: Prisma.ProvinceUpdateOneWithoutOpinionsNestedInput;
    author?: Prisma.UserUpdateOneWithoutOpinionsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutOpinionsNestedInput;
};
export type OpinionUncheckedUpdateInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionCreateManyInput = {
    provinceId?: string | null;
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OpinionUncheckedUpdateManyInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionListRelationFilter = {
    every?: Prisma.OpinionWhereInput;
    some?: Prisma.OpinionWhereInput;
    none?: Prisma.OpinionWhereInput;
};
export type OpinionOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type OpinionCountOrderByAggregateInput = {
    provinceId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    authorName?: Prisma.SortOrder;
    isAnonymous?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
};
export type OpinionMaxOrderByAggregateInput = {
    provinceId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    authorName?: Prisma.SortOrder;
    isAnonymous?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
};
export type OpinionMinOrderByAggregateInput = {
    provinceId?: Prisma.SortOrder;
    authorId?: Prisma.SortOrder;
    id?: Prisma.SortOrder;
    authorName?: Prisma.SortOrder;
    isAnonymous?: Prisma.SortOrder;
    content?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    publicationId?: Prisma.SortOrder;
};
export type OpinionCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput> | Prisma.OpinionCreateWithoutProvinceInput[] | Prisma.OpinionUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutProvinceInput | Prisma.OpinionCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.OpinionCreateManyProvinceInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUncheckedCreateNestedManyWithoutProvinceInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput> | Prisma.OpinionCreateWithoutProvinceInput[] | Prisma.OpinionUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutProvinceInput | Prisma.OpinionCreateOrConnectWithoutProvinceInput[];
    createMany?: Prisma.OpinionCreateManyProvinceInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput> | Prisma.OpinionCreateWithoutProvinceInput[] | Prisma.OpinionUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutProvinceInput | Prisma.OpinionCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutProvinceInput | Prisma.OpinionUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.OpinionCreateManyProvinceInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutProvinceInput | Prisma.OpinionUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutProvinceInput | Prisma.OpinionUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type OpinionUncheckedUpdateManyWithoutProvinceNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput> | Prisma.OpinionCreateWithoutProvinceInput[] | Prisma.OpinionUncheckedCreateWithoutProvinceInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutProvinceInput | Prisma.OpinionCreateOrConnectWithoutProvinceInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutProvinceInput | Prisma.OpinionUpsertWithWhereUniqueWithoutProvinceInput[];
    createMany?: Prisma.OpinionCreateManyProvinceInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutProvinceInput | Prisma.OpinionUpdateWithWhereUniqueWithoutProvinceInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutProvinceInput | Prisma.OpinionUpdateManyWithWhereWithoutProvinceInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type OpinionCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput> | Prisma.OpinionCreateWithoutAuthorInput[] | Prisma.OpinionUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutAuthorInput | Prisma.OpinionCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.OpinionCreateManyAuthorInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput> | Prisma.OpinionCreateWithoutAuthorInput[] | Prisma.OpinionUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutAuthorInput | Prisma.OpinionCreateOrConnectWithoutAuthorInput[];
    createMany?: Prisma.OpinionCreateManyAuthorInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput> | Prisma.OpinionCreateWithoutAuthorInput[] | Prisma.OpinionUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutAuthorInput | Prisma.OpinionCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutAuthorInput | Prisma.OpinionUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.OpinionCreateManyAuthorInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutAuthorInput | Prisma.OpinionUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutAuthorInput | Prisma.OpinionUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type OpinionUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput> | Prisma.OpinionCreateWithoutAuthorInput[] | Prisma.OpinionUncheckedCreateWithoutAuthorInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutAuthorInput | Prisma.OpinionCreateOrConnectWithoutAuthorInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutAuthorInput | Prisma.OpinionUpsertWithWhereUniqueWithoutAuthorInput[];
    createMany?: Prisma.OpinionCreateManyAuthorInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutAuthorInput | Prisma.OpinionUpdateWithWhereUniqueWithoutAuthorInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutAuthorInput | Prisma.OpinionUpdateManyWithWhereWithoutAuthorInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type EnumOpinionStatusFieldUpdateOperationsInput = {
    set?: $Enums.OpinionStatus;
};
export type OpinionCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput> | Prisma.OpinionCreateWithoutPublicationInput[] | Prisma.OpinionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutPublicationInput | Prisma.OpinionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.OpinionCreateManyPublicationInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUncheckedCreateNestedManyWithoutPublicationInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput> | Prisma.OpinionCreateWithoutPublicationInput[] | Prisma.OpinionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutPublicationInput | Prisma.OpinionCreateOrConnectWithoutPublicationInput[];
    createMany?: Prisma.OpinionCreateManyPublicationInputEnvelope;
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
};
export type OpinionUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput> | Prisma.OpinionCreateWithoutPublicationInput[] | Prisma.OpinionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutPublicationInput | Prisma.OpinionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.OpinionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.OpinionCreateManyPublicationInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.OpinionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutPublicationInput | Prisma.OpinionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type OpinionUncheckedUpdateManyWithoutPublicationNestedInput = {
    create?: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput> | Prisma.OpinionCreateWithoutPublicationInput[] | Prisma.OpinionUncheckedCreateWithoutPublicationInput[];
    connectOrCreate?: Prisma.OpinionCreateOrConnectWithoutPublicationInput | Prisma.OpinionCreateOrConnectWithoutPublicationInput[];
    upsert?: Prisma.OpinionUpsertWithWhereUniqueWithoutPublicationInput | Prisma.OpinionUpsertWithWhereUniqueWithoutPublicationInput[];
    createMany?: Prisma.OpinionCreateManyPublicationInputEnvelope;
    set?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    disconnect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    delete?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    connect?: Prisma.OpinionWhereUniqueInput | Prisma.OpinionWhereUniqueInput[];
    update?: Prisma.OpinionUpdateWithWhereUniqueWithoutPublicationInput | Prisma.OpinionUpdateWithWhereUniqueWithoutPublicationInput[];
    updateMany?: Prisma.OpinionUpdateManyWithWhereWithoutPublicationInput | Prisma.OpinionUpdateManyWithWhereWithoutPublicationInput[];
    deleteMany?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
};
export type OpinionCreateWithoutProvinceInput = {
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    author?: Prisma.UserCreateNestedOneWithoutOpinionsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutOpinionsInput;
};
export type OpinionUncheckedCreateWithoutProvinceInput = {
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionCreateOrConnectWithoutProvinceInput = {
    where: Prisma.OpinionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput>;
};
export type OpinionCreateManyProvinceInputEnvelope = {
    data: Prisma.OpinionCreateManyProvinceInput | Prisma.OpinionCreateManyProvinceInput[];
    skipDuplicates?: boolean;
};
export type OpinionUpsertWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.OpinionWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpinionUpdateWithoutProvinceInput, Prisma.OpinionUncheckedUpdateWithoutProvinceInput>;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutProvinceInput, Prisma.OpinionUncheckedCreateWithoutProvinceInput>;
};
export type OpinionUpdateWithWhereUniqueWithoutProvinceInput = {
    where: Prisma.OpinionWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpinionUpdateWithoutProvinceInput, Prisma.OpinionUncheckedUpdateWithoutProvinceInput>;
};
export type OpinionUpdateManyWithWhereWithoutProvinceInput = {
    where: Prisma.OpinionScalarWhereInput;
    data: Prisma.XOR<Prisma.OpinionUpdateManyMutationInput, Prisma.OpinionUncheckedUpdateManyWithoutProvinceInput>;
};
export type OpinionScalarWhereInput = {
    AND?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
    OR?: Prisma.OpinionScalarWhereInput[];
    NOT?: Prisma.OpinionScalarWhereInput | Prisma.OpinionScalarWhereInput[];
    provinceId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    authorId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    id?: Prisma.StringFilter<"Opinion"> | string;
    authorName?: Prisma.StringNullableFilter<"Opinion"> | string | null;
    isAnonymous?: Prisma.BoolFilter<"Opinion"> | boolean;
    content?: Prisma.StringFilter<"Opinion"> | string;
    status?: Prisma.EnumOpinionStatusFilter<"Opinion"> | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Opinion"> | Date | string;
    publicationId?: Prisma.StringNullableFilter<"Opinion"> | string | null;
};
export type OpinionCreateWithoutAuthorInput = {
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    province?: Prisma.ProvinceCreateNestedOneWithoutOpinionsInput;
    publication?: Prisma.PublicationCreateNestedOneWithoutOpinionsInput;
};
export type OpinionUncheckedCreateWithoutAuthorInput = {
    provinceId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionCreateOrConnectWithoutAuthorInput = {
    where: Prisma.OpinionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput>;
};
export type OpinionCreateManyAuthorInputEnvelope = {
    data: Prisma.OpinionCreateManyAuthorInput | Prisma.OpinionCreateManyAuthorInput[];
    skipDuplicates?: boolean;
};
export type OpinionUpsertWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.OpinionWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpinionUpdateWithoutAuthorInput, Prisma.OpinionUncheckedUpdateWithoutAuthorInput>;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutAuthorInput, Prisma.OpinionUncheckedCreateWithoutAuthorInput>;
};
export type OpinionUpdateWithWhereUniqueWithoutAuthorInput = {
    where: Prisma.OpinionWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpinionUpdateWithoutAuthorInput, Prisma.OpinionUncheckedUpdateWithoutAuthorInput>;
};
export type OpinionUpdateManyWithWhereWithoutAuthorInput = {
    where: Prisma.OpinionScalarWhereInput;
    data: Prisma.XOR<Prisma.OpinionUpdateManyMutationInput, Prisma.OpinionUncheckedUpdateManyWithoutAuthorInput>;
};
export type OpinionCreateWithoutPublicationInput = {
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    province?: Prisma.ProvinceCreateNestedOneWithoutOpinionsInput;
    author?: Prisma.UserCreateNestedOneWithoutOpinionsInput;
};
export type OpinionUncheckedCreateWithoutPublicationInput = {
    provinceId?: string | null;
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OpinionCreateOrConnectWithoutPublicationInput = {
    where: Prisma.OpinionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput>;
};
export type OpinionCreateManyPublicationInputEnvelope = {
    data: Prisma.OpinionCreateManyPublicationInput | Prisma.OpinionCreateManyPublicationInput[];
    skipDuplicates?: boolean;
};
export type OpinionUpsertWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.OpinionWhereUniqueInput;
    update: Prisma.XOR<Prisma.OpinionUpdateWithoutPublicationInput, Prisma.OpinionUncheckedUpdateWithoutPublicationInput>;
    create: Prisma.XOR<Prisma.OpinionCreateWithoutPublicationInput, Prisma.OpinionUncheckedCreateWithoutPublicationInput>;
};
export type OpinionUpdateWithWhereUniqueWithoutPublicationInput = {
    where: Prisma.OpinionWhereUniqueInput;
    data: Prisma.XOR<Prisma.OpinionUpdateWithoutPublicationInput, Prisma.OpinionUncheckedUpdateWithoutPublicationInput>;
};
export type OpinionUpdateManyWithWhereWithoutPublicationInput = {
    where: Prisma.OpinionScalarWhereInput;
    data: Prisma.XOR<Prisma.OpinionUpdateManyMutationInput, Prisma.OpinionUncheckedUpdateManyWithoutPublicationInput>;
};
export type OpinionCreateManyProvinceInput = {
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionUpdateWithoutProvinceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    author?: Prisma.UserUpdateOneWithoutOpinionsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutOpinionsNestedInput;
};
export type OpinionUncheckedUpdateWithoutProvinceInput = {
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionUncheckedUpdateManyWithoutProvinceInput = {
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionCreateManyAuthorInput = {
    provinceId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    publicationId?: string | null;
};
export type OpinionUpdateWithoutAuthorInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    province?: Prisma.ProvinceUpdateOneWithoutOpinionsNestedInput;
    publication?: Prisma.PublicationUpdateOneWithoutOpinionsNestedInput;
};
export type OpinionUncheckedUpdateWithoutAuthorInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionUncheckedUpdateManyWithoutAuthorInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    publicationId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
};
export type OpinionCreateManyPublicationInput = {
    provinceId?: string | null;
    authorId?: string | null;
    id?: string;
    authorName?: string | null;
    isAnonymous?: boolean;
    content: string;
    status?: $Enums.OpinionStatus;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type OpinionUpdateWithoutPublicationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    province?: Prisma.ProvinceUpdateOneWithoutOpinionsNestedInput;
    author?: Prisma.UserUpdateOneWithoutOpinionsNestedInput;
};
export type OpinionUncheckedUpdateWithoutPublicationInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OpinionUncheckedUpdateManyWithoutPublicationInput = {
    provinceId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    authorId?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    authorName?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    isAnonymous?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    content?: Prisma.StringFieldUpdateOperationsInput | string;
    status?: Prisma.EnumOpinionStatusFieldUpdateOperationsInput | $Enums.OpinionStatus;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type OpinionSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    provinceId?: boolean;
    authorId?: boolean;
    id?: boolean;
    authorName?: boolean;
    isAnonymous?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publicationId?: boolean;
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["opinion"]>;
export type OpinionSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    provinceId?: boolean;
    authorId?: boolean;
    id?: boolean;
    authorName?: boolean;
    isAnonymous?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publicationId?: boolean;
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["opinion"]>;
export type OpinionSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    provinceId?: boolean;
    authorId?: boolean;
    id?: boolean;
    authorName?: boolean;
    isAnonymous?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publicationId?: boolean;
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
}, ExtArgs["result"]["opinion"]>;
export type OpinionSelectScalar = {
    provinceId?: boolean;
    authorId?: boolean;
    id?: boolean;
    authorName?: boolean;
    isAnonymous?: boolean;
    content?: boolean;
    status?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    publicationId?: boolean;
};
export type OpinionOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"provinceId" | "authorId" | "id" | "authorName" | "isAnonymous" | "content" | "status" | "createdAt" | "updatedAt" | "publicationId", ExtArgs["result"]["opinion"]>;
export type OpinionInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
};
export type OpinionIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
};
export type OpinionIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    province?: boolean | Prisma.Opinion$provinceArgs<ExtArgs>;
    author?: boolean | Prisma.Opinion$authorArgs<ExtArgs>;
    publication?: boolean | Prisma.Opinion$publicationArgs<ExtArgs>;
};
export type $OpinionPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Opinion";
    objects: {
        province: Prisma.$ProvincePayload<ExtArgs> | null;
        author: Prisma.$UserPayload<ExtArgs> | null;
        publication: Prisma.$PublicationPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        provinceId: string | null;
        authorId: string | null;
        id: string;
        authorName: string | null;
        isAnonymous: boolean;
        content: string;
        status: $Enums.OpinionStatus;
        createdAt: Date;
        updatedAt: Date;
        publicationId: string | null;
    }, ExtArgs["result"]["opinion"]>;
    composites: {};
};
export type OpinionGetPayload<S extends boolean | null | undefined | OpinionDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$OpinionPayload, S>;
export type OpinionCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<OpinionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: OpinionCountAggregateInputType | true;
};
export interface OpinionDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Opinion'];
        meta: {
            name: 'Opinion';
        };
    };
    findUnique<T extends OpinionFindUniqueArgs>(args: Prisma.SelectSubset<T, OpinionFindUniqueArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends OpinionFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, OpinionFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends OpinionFindFirstArgs>(args?: Prisma.SelectSubset<T, OpinionFindFirstArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends OpinionFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, OpinionFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends OpinionFindManyArgs>(args?: Prisma.SelectSubset<T, OpinionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends OpinionCreateArgs>(args: Prisma.SelectSubset<T, OpinionCreateArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends OpinionCreateManyArgs>(args?: Prisma.SelectSubset<T, OpinionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends OpinionCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, OpinionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends OpinionDeleteArgs>(args: Prisma.SelectSubset<T, OpinionDeleteArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends OpinionUpdateArgs>(args: Prisma.SelectSubset<T, OpinionUpdateArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends OpinionDeleteManyArgs>(args?: Prisma.SelectSubset<T, OpinionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends OpinionUpdateManyArgs>(args: Prisma.SelectSubset<T, OpinionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends OpinionUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, OpinionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends OpinionUpsertArgs>(args: Prisma.SelectSubset<T, OpinionUpsertArgs<ExtArgs>>): Prisma.Prisma__OpinionClient<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends OpinionCountArgs>(args?: Prisma.Subset<T, OpinionCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], OpinionCountAggregateOutputType> : number>;
    aggregate<T extends OpinionAggregateArgs>(args: Prisma.Subset<T, OpinionAggregateArgs>): Prisma.PrismaPromise<GetOpinionAggregateType<T>>;
    groupBy<T extends OpinionGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: OpinionGroupByArgs['orderBy'];
    } : {
        orderBy?: OpinionGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, OpinionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOpinionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: OpinionFieldRefs;
}
export interface Prisma__OpinionClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    province<T extends Prisma.Opinion$provinceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Opinion$provinceArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    author<T extends Prisma.Opinion$authorArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Opinion$authorArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    publication<T extends Prisma.Opinion$publicationArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Opinion$publicationArgs<ExtArgs>>): Prisma.Prisma__PublicationClient<runtime.Types.Result.GetResult<Prisma.$PublicationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface OpinionFieldRefs {
    readonly provinceId: Prisma.FieldRef<"Opinion", 'String'>;
    readonly authorId: Prisma.FieldRef<"Opinion", 'String'>;
    readonly id: Prisma.FieldRef<"Opinion", 'String'>;
    readonly authorName: Prisma.FieldRef<"Opinion", 'String'>;
    readonly isAnonymous: Prisma.FieldRef<"Opinion", 'Boolean'>;
    readonly content: Prisma.FieldRef<"Opinion", 'String'>;
    readonly status: Prisma.FieldRef<"Opinion", 'OpinionStatus'>;
    readonly createdAt: Prisma.FieldRef<"Opinion", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Opinion", 'DateTime'>;
    readonly publicationId: Prisma.FieldRef<"Opinion", 'String'>;
}
export type OpinionFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    where: Prisma.OpinionWhereUniqueInput;
};
export type OpinionFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    where: Prisma.OpinionWhereUniqueInput;
};
export type OpinionFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OpinionFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OpinionFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type OpinionCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpinionCreateInput, Prisma.OpinionUncheckedCreateInput>;
};
export type OpinionCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.OpinionCreateManyInput | Prisma.OpinionCreateManyInput[];
    skipDuplicates?: boolean;
};
export type OpinionCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    data: Prisma.OpinionCreateManyInput | Prisma.OpinionCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.OpinionIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type OpinionUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpinionUpdateInput, Prisma.OpinionUncheckedUpdateInput>;
    where: Prisma.OpinionWhereUniqueInput;
};
export type OpinionUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.OpinionUpdateManyMutationInput, Prisma.OpinionUncheckedUpdateManyInput>;
    where?: Prisma.OpinionWhereInput;
    limit?: number;
};
export type OpinionUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.OpinionUpdateManyMutationInput, Prisma.OpinionUncheckedUpdateManyInput>;
    where?: Prisma.OpinionWhereInput;
    limit?: number;
    include?: Prisma.OpinionIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type OpinionUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    where: Prisma.OpinionWhereUniqueInput;
    create: Prisma.XOR<Prisma.OpinionCreateInput, Prisma.OpinionUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.OpinionUpdateInput, Prisma.OpinionUncheckedUpdateInput>;
};
export type OpinionDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
    where: Prisma.OpinionWhereUniqueInput;
};
export type OpinionDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpinionWhereInput;
    limit?: number;
};
export type Opinion$provinceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where?: Prisma.ProvinceWhereInput;
};
export type Opinion$authorArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
};
export type Opinion$publicationArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.PublicationSelect<ExtArgs> | null;
    omit?: Prisma.PublicationOmit<ExtArgs> | null;
    include?: Prisma.PublicationInclude<ExtArgs> | null;
    where?: Prisma.PublicationWhereInput;
};
export type OpinionDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.OpinionSelect<ExtArgs> | null;
    omit?: Prisma.OpinionOmit<ExtArgs> | null;
    include?: Prisma.OpinionInclude<ExtArgs> | null;
};
