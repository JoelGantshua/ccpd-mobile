
import {
    Controller,
    ForbiddenException,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Req,
    UseGuards,
  } from '@nestjs/common';
  
  import { JwtAccessGuard } from './jwt-access.guard.js';
  import { AdminMembersService } from './admin-members.service.js';
  
  type AdminRequest = {
    user: {
      id: string;
      role: string;
      provinceId: string | null;
    };
  };
  
  @Controller('admin/members')
  @UseGuards(JwtAccessGuard)
  export class AdminMembersController {
    constructor(
      private readonly adminMembers: AdminMembersService,
    ) {}
  
    private requireAdmin(request: AdminRequest) {
      if (request.user.role !== 'ADMIN') {
        throw new ForbiddenException(
          'Accès réservé aux administrateurs',
        );
      }
    }
  
    @Get('pending')
    async pending(@Req() request: AdminRequest) {
      this.requireAdmin(request);
  
      return this.adminMembers.findPending();
    }
  
    @Patch(':id/approve')
    async approve(
      @Req() request: AdminRequest,
      @Param('id', new ParseUUIDPipe({ version: '4' }))
      id: string,
    ) {
      this.requireAdmin(request);
  
      return this.adminMembers.approveMember(id);
    }
  }
  