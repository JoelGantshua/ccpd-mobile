import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { PublicationsService } from './publications.service.js';
import { StreamableFile } from '@nestjs/common';
@Controller('publications')
export class PublicationsController {
  constructor(
    private readonly publicationsService: PublicationsService,
  ) {}

  @Get()
  findPublished(
    @Query('type') type?: string,
    @Query('page') page?: string,
  ) {
    return this.publicationsService.findPublished(type, page);
  }


@Get('doctrines')
findPublishedDoctrines() {
  return this.publicationsService.findPublishedDoctrines();
}

  @Get(':id')
  findPublishedById(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.publicationsService.findPublishedById(id);
  }


@Get(':id/file')
async getPdf(
  @Param('id', new ParseUUIDPipe({ version: '4' }))
  id: string,
) {
  const buffer = await this.publicationsService.getPublishedPdf(id);

  return new StreamableFile(buffer, {
    type: 'application/pdf',
    disposition: `inline; filename="publication-${id}.pdf"`,
    length: buffer.length,
  });
}

}
