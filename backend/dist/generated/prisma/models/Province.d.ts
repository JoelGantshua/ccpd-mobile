import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
export type ProvinceModel = runtime.Types.Result.DefaultSelection<Prisma.$ProvincePayload>;
export type AggregateProvince = {
    _count: ProvinceCountAggregateOutputType | null;
    _min: ProvinceMinAggregateOutputType | null;
    _max: ProvinceMaxAggregateOutputType | null;
};
export type ProvinceMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProvinceMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type ProvinceCountAggregateOutputType = {
    id: number;
    name: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type ProvinceMinAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProvinceMaxAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type ProvinceCountAggregateInputType = {
    id?: true;
    name?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type ProvinceAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithRelationInput | Prisma.ProvinceOrderByWithRelationInput[];
    cursor?: Prisma.ProvinceWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | ProvinceCountAggregateInputType;
    _min?: ProvinceMinAggregateInputType;
    _max?: ProvinceMaxAggregateInputType;
};
export type GetProvinceAggregateType<T extends ProvinceAggregateArgs> = {
    [P in keyof T & keyof AggregateProvince]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateProvince[P]> : Prisma.GetScalarType<T[P], AggregateProvince[P]>;
};
export type ProvinceGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithAggregationInput | Prisma.ProvinceOrderByWithAggregationInput[];
    by: Prisma.ProvinceScalarFieldEnum[] | Prisma.ProvinceScalarFieldEnum;
    having?: Prisma.ProvinceScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ProvinceCountAggregateInputType | true;
    _min?: ProvinceMinAggregateInputType;
    _max?: ProvinceMaxAggregateInputType;
};
export type ProvinceGroupByOutputType = {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    _count: ProvinceCountAggregateOutputType | null;
    _min: ProvinceMinAggregateOutputType | null;
    _max: ProvinceMaxAggregateOutputType | null;
};
export type GetProvinceGroupByPayload<T extends ProvinceGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ProvinceGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ProvinceGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ProvinceGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ProvinceGroupByOutputType[P]>;
}>>;
export type ProvinceWhereInput = {
    AND?: Prisma.ProvinceWhereInput | Prisma.ProvinceWhereInput[];
    OR?: Prisma.ProvinceWhereInput[];
    NOT?: Prisma.ProvinceWhereInput | Prisma.ProvinceWhereInput[];
    id?: Prisma.StringFilter<"Province"> | string;
    name?: Prisma.StringFilter<"Province"> | string;
    createdAt?: Prisma.DateTimeFilter<"Province"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Province"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    participations?: Prisma.ParticipationListRelationFilter;
    opinions?: Prisma.OpinionListRelationFilter;
    committeeMembers?: Prisma.CommitteeMemberListRelationFilter;
};
export type ProvinceOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    users?: Prisma.UserOrderByRelationAggregateInput;
    participations?: Prisma.ParticipationOrderByRelationAggregateInput;
    opinions?: Prisma.OpinionOrderByRelationAggregateInput;
    committeeMembers?: Prisma.CommitteeMemberOrderByRelationAggregateInput;
};
export type ProvinceWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    name?: string;
    AND?: Prisma.ProvinceWhereInput | Prisma.ProvinceWhereInput[];
    OR?: Prisma.ProvinceWhereInput[];
    NOT?: Prisma.ProvinceWhereInput | Prisma.ProvinceWhereInput[];
    createdAt?: Prisma.DateTimeFilter<"Province"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Province"> | Date | string;
    users?: Prisma.UserListRelationFilter;
    participations?: Prisma.ParticipationListRelationFilter;
    opinions?: Prisma.OpinionListRelationFilter;
    committeeMembers?: Prisma.CommitteeMemberListRelationFilter;
}, "id" | "name">;
export type ProvinceOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.ProvinceCountOrderByAggregateInput;
    _max?: Prisma.ProvinceMaxOrderByAggregateInput;
    _min?: Prisma.ProvinceMinOrderByAggregateInput;
};
export type ProvinceScalarWhereWithAggregatesInput = {
    AND?: Prisma.ProvinceScalarWhereWithAggregatesInput | Prisma.ProvinceScalarWhereWithAggregatesInput[];
    OR?: Prisma.ProvinceScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ProvinceScalarWhereWithAggregatesInput | Prisma.ProvinceScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Province"> | string;
    name?: Prisma.StringWithAggregatesFilter<"Province"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Province"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Province"> | Date | string;
};
export type ProvinceCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUncheckedCreateInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationUncheckedCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionUncheckedCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUncheckedUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUncheckedUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceCreateManyInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type ProvinceUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProvinceUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ProvinceCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProvinceMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProvinceMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type ProvinceNullableScalarRelationFilter = {
    is?: Prisma.ProvinceWhereInput | null;
    isNot?: Prisma.ProvinceWhereInput | null;
};
export type ProvinceScalarRelationFilter = {
    is?: Prisma.ProvinceWhereInput;
    isNot?: Prisma.ProvinceWhereInput;
};
export type StringFieldUpdateOperationsInput = {
    set?: string;
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type ProvinceCreateNestedOneWithoutUsersInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutUsersInput, Prisma.ProvinceUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutUsersInput;
    connect?: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceUpdateOneWithoutUsersNestedInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutUsersInput, Prisma.ProvinceUncheckedCreateWithoutUsersInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutUsersInput;
    upsert?: Prisma.ProvinceUpsertWithoutUsersInput;
    disconnect?: Prisma.ProvinceWhereInput | boolean;
    delete?: Prisma.ProvinceWhereInput | boolean;
    connect?: Prisma.ProvinceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProvinceUpdateToOneWithWhereWithoutUsersInput, Prisma.ProvinceUpdateWithoutUsersInput>, Prisma.ProvinceUncheckedUpdateWithoutUsersInput>;
};
export type ProvinceCreateNestedOneWithoutOpinionsInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutOpinionsInput, Prisma.ProvinceUncheckedCreateWithoutOpinionsInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutOpinionsInput;
    connect?: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceUpdateOneWithoutOpinionsNestedInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutOpinionsInput, Prisma.ProvinceUncheckedCreateWithoutOpinionsInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutOpinionsInput;
    upsert?: Prisma.ProvinceUpsertWithoutOpinionsInput;
    disconnect?: Prisma.ProvinceWhereInput | boolean;
    delete?: Prisma.ProvinceWhereInput | boolean;
    connect?: Prisma.ProvinceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProvinceUpdateToOneWithWhereWithoutOpinionsInput, Prisma.ProvinceUpdateWithoutOpinionsInput>, Prisma.ProvinceUncheckedUpdateWithoutOpinionsInput>;
};
export type ProvinceCreateNestedOneWithoutParticipationsInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutParticipationsInput, Prisma.ProvinceUncheckedCreateWithoutParticipationsInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutParticipationsInput;
    connect?: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceUpdateOneRequiredWithoutParticipationsNestedInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutParticipationsInput, Prisma.ProvinceUncheckedCreateWithoutParticipationsInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutParticipationsInput;
    upsert?: Prisma.ProvinceUpsertWithoutParticipationsInput;
    connect?: Prisma.ProvinceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProvinceUpdateToOneWithWhereWithoutParticipationsInput, Prisma.ProvinceUpdateWithoutParticipationsInput>, Prisma.ProvinceUncheckedUpdateWithoutParticipationsInput>;
};
export type ProvinceCreateNestedOneWithoutCommitteeMembersInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedCreateWithoutCommitteeMembersInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutCommitteeMembersInput;
    connect?: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceUpdateOneWithoutCommitteeMembersNestedInput = {
    create?: Prisma.XOR<Prisma.ProvinceCreateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedCreateWithoutCommitteeMembersInput>;
    connectOrCreate?: Prisma.ProvinceCreateOrConnectWithoutCommitteeMembersInput;
    upsert?: Prisma.ProvinceUpsertWithoutCommitteeMembersInput;
    disconnect?: Prisma.ProvinceWhereInput | boolean;
    delete?: Prisma.ProvinceWhereInput | boolean;
    connect?: Prisma.ProvinceWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.ProvinceUpdateToOneWithWhereWithoutCommitteeMembersInput, Prisma.ProvinceUpdateWithoutCommitteeMembersInput>, Prisma.ProvinceUncheckedUpdateWithoutCommitteeMembersInput>;
};
export type ProvinceCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participations?: Prisma.ParticipationCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUncheckedCreateWithoutUsersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    participations?: Prisma.ParticipationUncheckedCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionUncheckedCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedCreateNestedManyWithoutProvinceInput;
};
export type ProvinceCreateOrConnectWithoutUsersInput = {
    where: Prisma.ProvinceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutUsersInput, Prisma.ProvinceUncheckedCreateWithoutUsersInput>;
};
export type ProvinceUpsertWithoutUsersInput = {
    update: Prisma.XOR<Prisma.ProvinceUpdateWithoutUsersInput, Prisma.ProvinceUncheckedUpdateWithoutUsersInput>;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutUsersInput, Prisma.ProvinceUncheckedCreateWithoutUsersInput>;
    where?: Prisma.ProvinceWhereInput;
};
export type ProvinceUpdateToOneWithWhereWithoutUsersInput = {
    where?: Prisma.ProvinceWhereInput;
    data: Prisma.XOR<Prisma.ProvinceUpdateWithoutUsersInput, Prisma.ProvinceUncheckedUpdateWithoutUsersInput>;
};
export type ProvinceUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participations?: Prisma.ParticipationUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceUncheckedUpdateWithoutUsersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    participations?: Prisma.ParticipationUncheckedUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUncheckedUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceCreateWithoutOpinionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUncheckedCreateWithoutOpinionsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationUncheckedCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedCreateNestedManyWithoutProvinceInput;
};
export type ProvinceCreateOrConnectWithoutOpinionsInput = {
    where: Prisma.ProvinceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutOpinionsInput, Prisma.ProvinceUncheckedCreateWithoutOpinionsInput>;
};
export type ProvinceUpsertWithoutOpinionsInput = {
    update: Prisma.XOR<Prisma.ProvinceUpdateWithoutOpinionsInput, Prisma.ProvinceUncheckedUpdateWithoutOpinionsInput>;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutOpinionsInput, Prisma.ProvinceUncheckedCreateWithoutOpinionsInput>;
    where?: Prisma.ProvinceWhereInput;
};
export type ProvinceUpdateToOneWithWhereWithoutOpinionsInput = {
    where?: Prisma.ProvinceWhereInput;
    data: Prisma.XOR<Prisma.ProvinceUpdateWithoutOpinionsInput, Prisma.ProvinceUncheckedUpdateWithoutOpinionsInput>;
};
export type ProvinceUpdateWithoutOpinionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceUncheckedUpdateWithoutOpinionsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUncheckedUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceCreateWithoutParticipationsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUncheckedCreateWithoutParticipationsInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionUncheckedCreateNestedManyWithoutProvinceInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedCreateNestedManyWithoutProvinceInput;
};
export type ProvinceCreateOrConnectWithoutParticipationsInput = {
    where: Prisma.ProvinceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutParticipationsInput, Prisma.ProvinceUncheckedCreateWithoutParticipationsInput>;
};
export type ProvinceUpsertWithoutParticipationsInput = {
    update: Prisma.XOR<Prisma.ProvinceUpdateWithoutParticipationsInput, Prisma.ProvinceUncheckedUpdateWithoutParticipationsInput>;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutParticipationsInput, Prisma.ProvinceUncheckedCreateWithoutParticipationsInput>;
    where?: Prisma.ProvinceWhereInput;
};
export type ProvinceUpdateToOneWithWhereWithoutParticipationsInput = {
    where?: Prisma.ProvinceWhereInput;
    data: Prisma.XOR<Prisma.ProvinceUpdateWithoutParticipationsInput, Prisma.ProvinceUncheckedUpdateWithoutParticipationsInput>;
};
export type ProvinceUpdateWithoutParticipationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceUncheckedUpdateWithoutParticipationsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUncheckedUpdateManyWithoutProvinceNestedInput;
    committeeMembers?: Prisma.CommitteeMemberUncheckedUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceCreateWithoutCommitteeMembersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionCreateNestedManyWithoutProvinceInput;
};
export type ProvinceUncheckedCreateWithoutCommitteeMembersInput = {
    id?: string;
    name: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    users?: Prisma.UserUncheckedCreateNestedManyWithoutProvinceInput;
    participations?: Prisma.ParticipationUncheckedCreateNestedManyWithoutProvinceInput;
    opinions?: Prisma.OpinionUncheckedCreateNestedManyWithoutProvinceInput;
};
export type ProvinceCreateOrConnectWithoutCommitteeMembersInput = {
    where: Prisma.ProvinceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedCreateWithoutCommitteeMembersInput>;
};
export type ProvinceUpsertWithoutCommitteeMembersInput = {
    update: Prisma.XOR<Prisma.ProvinceUpdateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedUpdateWithoutCommitteeMembersInput>;
    create: Prisma.XOR<Prisma.ProvinceCreateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedCreateWithoutCommitteeMembersInput>;
    where?: Prisma.ProvinceWhereInput;
};
export type ProvinceUpdateToOneWithWhereWithoutCommitteeMembersInput = {
    where?: Prisma.ProvinceWhereInput;
    data: Prisma.XOR<Prisma.ProvinceUpdateWithoutCommitteeMembersInput, Prisma.ProvinceUncheckedUpdateWithoutCommitteeMembersInput>;
};
export type ProvinceUpdateWithoutCommitteeMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceUncheckedUpdateWithoutCommitteeMembersInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    users?: Prisma.UserUncheckedUpdateManyWithoutProvinceNestedInput;
    participations?: Prisma.ParticipationUncheckedUpdateManyWithoutProvinceNestedInput;
    opinions?: Prisma.OpinionUncheckedUpdateManyWithoutProvinceNestedInput;
};
export type ProvinceCountOutputType = {
    users: number;
    participations: number;
    opinions: number;
    committeeMembers: number;
};
export type ProvinceCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | ProvinceCountOutputTypeCountUsersArgs;
    participations?: boolean | ProvinceCountOutputTypeCountParticipationsArgs;
    opinions?: boolean | ProvinceCountOutputTypeCountOpinionsArgs;
    committeeMembers?: boolean | ProvinceCountOutputTypeCountCommitteeMembersArgs;
};
export type ProvinceCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceCountOutputTypeSelect<ExtArgs> | null;
};
export type ProvinceCountOutputTypeCountUsersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.UserWhereInput;
};
export type ProvinceCountOutputTypeCountParticipationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ParticipationWhereInput;
};
export type ProvinceCountOutputTypeCountOpinionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.OpinionWhereInput;
};
export type ProvinceCountOutputTypeCountCommitteeMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.CommitteeMemberWhereInput;
};
export type ProvinceSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    users?: boolean | Prisma.Province$usersArgs<ExtArgs>;
    participations?: boolean | Prisma.Province$participationsArgs<ExtArgs>;
    opinions?: boolean | Prisma.Province$opinionsArgs<ExtArgs>;
    committeeMembers?: boolean | Prisma.Province$committeeMembersArgs<ExtArgs>;
    _count?: boolean | Prisma.ProvinceCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["province"]>;
export type ProvinceSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["province"]>;
export type ProvinceSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["province"]>;
export type ProvinceSelectScalar = {
    id?: boolean;
    name?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type ProvinceOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "createdAt" | "updatedAt", ExtArgs["result"]["province"]>;
export type ProvinceInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    users?: boolean | Prisma.Province$usersArgs<ExtArgs>;
    participations?: boolean | Prisma.Province$participationsArgs<ExtArgs>;
    opinions?: boolean | Prisma.Province$opinionsArgs<ExtArgs>;
    committeeMembers?: boolean | Prisma.Province$committeeMembersArgs<ExtArgs>;
    _count?: boolean | Prisma.ProvinceCountOutputTypeDefaultArgs<ExtArgs>;
};
export type ProvinceIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type ProvinceIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $ProvincePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Province";
    objects: {
        users: Prisma.$UserPayload<ExtArgs>[];
        participations: Prisma.$ParticipationPayload<ExtArgs>[];
        opinions: Prisma.$OpinionPayload<ExtArgs>[];
        committeeMembers: Prisma.$CommitteeMemberPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["province"]>;
    composites: {};
};
export type ProvinceGetPayload<S extends boolean | null | undefined | ProvinceDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ProvincePayload, S>;
export type ProvinceCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ProvinceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ProvinceCountAggregateInputType | true;
};
export interface ProvinceDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Province'];
        meta: {
            name: 'Province';
        };
    };
    findUnique<T extends ProvinceFindUniqueArgs>(args: Prisma.SelectSubset<T, ProvinceFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends ProvinceFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ProvinceFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends ProvinceFindFirstArgs>(args?: Prisma.SelectSubset<T, ProvinceFindFirstArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends ProvinceFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ProvinceFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends ProvinceFindManyArgs>(args?: Prisma.SelectSubset<T, ProvinceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends ProvinceCreateArgs>(args: Prisma.SelectSubset<T, ProvinceCreateArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends ProvinceCreateManyArgs>(args?: Prisma.SelectSubset<T, ProvinceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends ProvinceCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ProvinceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends ProvinceDeleteArgs>(args: Prisma.SelectSubset<T, ProvinceDeleteArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends ProvinceUpdateArgs>(args: Prisma.SelectSubset<T, ProvinceUpdateArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends ProvinceDeleteManyArgs>(args?: Prisma.SelectSubset<T, ProvinceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends ProvinceUpdateManyArgs>(args: Prisma.SelectSubset<T, ProvinceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends ProvinceUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ProvinceUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends ProvinceUpsertArgs>(args: Prisma.SelectSubset<T, ProvinceUpsertArgs<ExtArgs>>): Prisma.Prisma__ProvinceClient<runtime.Types.Result.GetResult<Prisma.$ProvincePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends ProvinceCountArgs>(args?: Prisma.Subset<T, ProvinceCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ProvinceCountAggregateOutputType> : number>;
    aggregate<T extends ProvinceAggregateArgs>(args: Prisma.Subset<T, ProvinceAggregateArgs>): Prisma.PrismaPromise<GetProvinceAggregateType<T>>;
    groupBy<T extends ProvinceGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ProvinceGroupByArgs['orderBy'];
    } : {
        orderBy?: ProvinceGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ProvinceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProvinceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: ProvinceFieldRefs;
}
export interface Prisma__ProvinceClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    users<T extends Prisma.Province$usersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Province$usersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    participations<T extends Prisma.Province$participationsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Province$participationsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ParticipationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    opinions<T extends Prisma.Province$opinionsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Province$opinionsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$OpinionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    committeeMembers<T extends Prisma.Province$committeeMembersArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Province$committeeMembersArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$CommitteeMemberPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface ProvinceFieldRefs {
    readonly id: Prisma.FieldRef<"Province", 'String'>;
    readonly name: Prisma.FieldRef<"Province", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Province", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Province", 'DateTime'>;
}
export type ProvinceFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithRelationInput | Prisma.ProvinceOrderByWithRelationInput[];
    cursor?: Prisma.ProvinceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProvinceScalarFieldEnum | Prisma.ProvinceScalarFieldEnum[];
};
export type ProvinceFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithRelationInput | Prisma.ProvinceOrderByWithRelationInput[];
    cursor?: Prisma.ProvinceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProvinceScalarFieldEnum | Prisma.ProvinceScalarFieldEnum[];
};
export type ProvinceFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where?: Prisma.ProvinceWhereInput;
    orderBy?: Prisma.ProvinceOrderByWithRelationInput | Prisma.ProvinceOrderByWithRelationInput[];
    cursor?: Prisma.ProvinceWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ProvinceScalarFieldEnum | Prisma.ProvinceScalarFieldEnum[];
};
export type ProvinceCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProvinceCreateInput, Prisma.ProvinceUncheckedCreateInput>;
};
export type ProvinceCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.ProvinceCreateManyInput | Prisma.ProvinceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProvinceCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    data: Prisma.ProvinceCreateManyInput | Prisma.ProvinceCreateManyInput[];
    skipDuplicates?: boolean;
};
export type ProvinceUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProvinceUpdateInput, Prisma.ProvinceUncheckedUpdateInput>;
    where: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.ProvinceUpdateManyMutationInput, Prisma.ProvinceUncheckedUpdateManyInput>;
    where?: Prisma.ProvinceWhereInput;
    limit?: number;
};
export type ProvinceUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.ProvinceUpdateManyMutationInput, Prisma.ProvinceUncheckedUpdateManyInput>;
    where?: Prisma.ProvinceWhereInput;
    limit?: number;
};
export type ProvinceUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where: Prisma.ProvinceWhereUniqueInput;
    create: Prisma.XOR<Prisma.ProvinceCreateInput, Prisma.ProvinceUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.ProvinceUpdateInput, Prisma.ProvinceUncheckedUpdateInput>;
};
export type ProvinceDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
    where: Prisma.ProvinceWhereUniqueInput;
};
export type ProvinceDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ProvinceWhereInput;
    limit?: number;
};
export type Province$usersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.UserSelect<ExtArgs> | null;
    omit?: Prisma.UserOmit<ExtArgs> | null;
    include?: Prisma.UserInclude<ExtArgs> | null;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput | Prisma.UserOrderByWithRelationInput[];
    cursor?: Prisma.UserWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.UserScalarFieldEnum | Prisma.UserScalarFieldEnum[];
};
export type Province$participationsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Province$opinionsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type Province$committeeMembersArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
export type ProvinceDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.ProvinceSelect<ExtArgs> | null;
    omit?: Prisma.ProvinceOmit<ExtArgs> | null;
    include?: Prisma.ProvinceInclude<ExtArgs> | null;
};
