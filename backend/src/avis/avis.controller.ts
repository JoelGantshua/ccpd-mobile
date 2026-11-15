import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { Throttle } from '@nestjs/throttler';

import { AvisService } from './avis.service.js';
import { CreateAvisDto } from './dto/create-avis.dto.js';

@Controller('avis')
export class AvisController {
  constructor(
    private readonly avisService: AvisService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Throttle({
    default: {
      limit: 5,
      ttl: 60_000,
    },
  })
  @UsePipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }))
  create(@Body() dto: CreateAvisDto) {
    return this.avisService.create(dto);
  }
}
