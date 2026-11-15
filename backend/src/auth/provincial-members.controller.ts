
import {
    Controller,
    ForbiddenException,
    Get,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { JwtAccessGuard } from './jwt-access.guard.js';
  import { ProvincialMembersService } from './provincial-members.service.js';
  
  type ProvincialRequest = {
    user: {
      id: string;
      role: string;
      provinceId: string | null;
    };
  };
  
  @Controller('provincial/members')
  @UseGuards(JwtAccessGuard)
  export class ProvincialMembersController {
    constructor(
      private readonly provincialMembers: ProvincialMembersService,
    ) {}
  
    private requireProvincialAccess(
      request: ProvincialRequest,
    ): string {
      if (
        request.user.role !== 'RESPONSABLE_PROVINCIAL' ||
        !request.user.provinceId
      ) {
        throw new ForbiddenException(
          'Acces reserve aux responsables provinciaux',
        );
      }
  
      return request.user.provinceId;
    }
  
    @Get()
    async members(@Req() request: ProvincialRequest) {
      const provinceId = this.requireProvincialAccess(request);
  
      return this.provincialMembers.findMembers(provinceId);
    }
  
    @Get('pending')
    async pending(@Req() request: ProvincialRequest) {
      const provinceId = this.requireProvincialAccess(request);
  
      return this.provincialMembers.findPending(provinceId);
    }
  }
  