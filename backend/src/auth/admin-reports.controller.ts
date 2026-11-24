import { Controller, Get, Query, Header, StreamableFile, UseGuards } from '@nestjs/common';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { AdminReportsService } from './admin-reports.service.js';
@Controller('admin/reports')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminReportsController {
 constructor(private readonly reports:AdminReportsService){}
 @Get('excel')
 @Header('Cache-Control','private, no-store')
 @Header('X-Content-Type-Options','nosniff')
 async excel(@Query('kind') kind='all',@Query('scope') scope='all'){
  const data=await this.reports.generate(kind,scope);
  return new StreamableFile(data,{type:'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',disposition:'attachment; filename="CCPD_Rapport.xlsx"',length:data.length});
 }
}
