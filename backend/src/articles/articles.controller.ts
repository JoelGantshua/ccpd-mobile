import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

import { ArticlesService } from './articles.service.js';

@Controller('articles')
export class ArticlesController {
  constructor(
    private readonly articlesService: ArticlesService,
  ) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('page') page?: string,
  ) {
    return this.articlesService.findPublished(
      category,
      page,
    );
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' }))
    id: string,
  ) {
    return this.articlesService.findPublishedById(id);
  }
}