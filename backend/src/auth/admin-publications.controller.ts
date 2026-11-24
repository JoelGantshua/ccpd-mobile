import { Body, Controller, Get, Header, Param, ParseUUIDPipe, Patch, Post, Query, StreamableFile, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { AdminGuard } from './admin.guard.js';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';

@Controller('admin/publications')
@UseGuards(JwtAccessGuard, AdminGuard)
export class AdminPublicationsController {
  constructor(private readonly publications: PublicationsService) {}
  @Get()
  list(@Query('type') type: string, @Query('page') page?: string) {
    return this.publications.adminList(type, page);
  }
  @Get(':id')
  detail(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
    return this.publications.adminDetail(id);
  }
  @Post()
  create(@Body() dto: CreatePublicationDto) { return this.publications.createDraft(dto); }
  @Patch(':id')
  update(@Param('id', new ParseUUIDPipe({version:'4'})) id: string, @Body() dto: CreatePublicationDto) {
    return this.publications.adminUpdate(id, dto);
  }
  @Post(':id/file')
  @UseInterceptors(FileInterceptor('file', {storage: memoryStorage(), limits:{fileSize:10*1024*1024,files:1,fields:0,parts:1}}))
  upload(@Param('id', new ParseUUIDPipe({version:'4'})) id: string, @UploadedFile() file?: Express.Multer.File) {
    return this.publications.attachPdf(id,file);
  }
  @Get(':id/file')
  @Header('Cache-Control','private, no-store')
  @Header('X-Content-Type-Options','nosniff')
  async preview(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) {
    const buffer = await this.publications.getAdminPdf(id);
    return new StreamableFile(buffer,{type:'application/pdf',disposition:'inline',length:buffer.length});
  }
  @Patch(':id/publish')
  publish(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.publish(id); }
  @Patch(':id/archive')
  archive(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.adminStatus(id,'ARCHIVED'); }
  @Patch(':id/draft')
  draft(@Param('id', new ParseUUIDPipe({version:'4'})) id: string) { return this.publications.adminStatus(id,'DRAFT'); }
}
