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
  
  import { ParticipationsService } from './participations.service.js';
  import { CreateParticipationDto } from './dto/create-participation.dto.js';
  
  @Controller('participations')
  export class ParticipationsController {
    constructor(
      private readonly participationsService:
        ParticipationsService,
    ) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @Throttle({
      default: {
        limit: 3,
        ttl: 60_000,
      },
    })
    @UsePipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    )
    create(@Body() dto: CreateParticipationDto) {
      return this.participationsService.create(dto);
    }
  }