import {
  Controller,
  Get,
  Patch,
  Param,
  Query,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';

import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { AdminInstitutionService } from './admin-institution.service.js';

@Controller('admin')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminInstitutionController {
  constructor(private readonly institution: AdminInstitutionService) {}

  @Get('members')
  members(@Query('provinceId') provinceId?: string, @Query('page') page?: string) {
    return this.institution.members(provinceId, page);
  }

  @Get('opinions')
  opinions(@Query('provinceId') provinceId?: string, @Query('page') page?: string) {
    return this.institution.opinions(provinceId, page);
  }

  @Get('participations')
  participations(@Query('provinceId') provinceId?: string, @Query('page') page?: string) {
    return this.institution.participations(provinceId, page);
  }

  @Get('statistics')
  statistics() {
    return this.institution.statistics();
  }

  @Patch('opinions/:id/approve')
  approveOpinion(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.institution.moderateOpinion(id, 'APPROVED');
  }

  @Patch('opinions/:id/reject')
  rejectOpinion(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.institution.moderateOpinion(id, 'REJECTED');
  }

  @Patch('participations/:id/approve')
  approveParticipation(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.institution.moderateParticipation(id, 'APPROVED');
  }

  @Patch('participations/:id/reject')
  rejectParticipation(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.institution.moderateParticipation(id, 'REJECTED');
  }
}
