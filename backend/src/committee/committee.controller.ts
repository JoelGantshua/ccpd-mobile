import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
} from '@nestjs/common';

import { CommitteeService } from './committee.service.js';

@Controller('committee')
export class CommitteeController {
  constructor(
    private readonly committeeService: CommitteeService,
  ) {}

  @Get()
  findAll() {
    return this.committeeService.findPublished();
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.committeeService.findPublishedById(id);
  }
}