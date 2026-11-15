import {
  Body,
  Controller,
  ForbiddenException,
  Patch,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {
    Param,
    ParseUUIDPipe,
    UploadedFile,
    UseInterceptors,
  } from '@nestjs/common';
  
  import { FileInterceptor } from '@nestjs/platform-express';
  import { memoryStorage } from 'multer';
import { JwtAccessGuard } from './jwt-access.guard.js';
import { PublicationsService } from '../publications/publications.service.js';
import { CreatePublicationDto } from '../publications/dto/create-publication.dto.js';

type AdminRequest = {
  user: {
    id: string;
    role: string;
    provinceId: string | null;
  };
};

@Controller('admin/publications')
@UseGuards(JwtAccessGuard)
export class AdminPublicationsController {
  constructor(
    private readonly publications: PublicationsService,
  ) {}

  @Post()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  create(
    @Req() request: AdminRequest,
    @Body() dto: CreatePublicationDto,
  ) {
    if (request.user.role !== 'ADMIN') {
      throw new ForbiddenException(
        'Accès réservé aux administrateurs.',
      );
    }

    return this.publications.createDraft(dto);
  }

@Post(':id/file')
@UseInterceptors(
  FileInterceptor('file', {
    storage: memoryStorage(),
    limits: {
      fileSize: 10 * 1024 * 1024,
      files: 1,
      fields: 0,
      parts: 1,
    },
  }),
)
uploadPdf(
  @Req() request: AdminRequest,
  @Param('id', new ParseUUIDPipe({ version: '4' }))
  id: string,
  @UploadedFile() file?: Express.Multer.File,
) {
  if (request.user.role !== 'ADMIN') {
    throw new ForbiddenException(
      'Accès réservé aux administrateurs.',
    );
  }

  return this.publications.attachPdf(id, file);
}



@Patch(':id/publish')
publish(
  @Req() request: AdminRequest,
  @Param('id', new ParseUUIDPipe({ version: '4' }))
  id: string,
) {
  if (request.user.role !== 'ADMIN') {
    throw new ForbiddenException(
      'Accès réservé aux administrateurs.',
    );
  }

  return this.publications.publish(id);
}

}
