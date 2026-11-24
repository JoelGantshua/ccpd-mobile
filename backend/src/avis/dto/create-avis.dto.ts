import {
  IsBoolean,
  IsString,
  IsUUID,
  MinLength,
  MaxLength,
} from 'class-validator';

import { Transform } from 'class-transformer';

export class CreateAvisDto {
  @IsUUID('4')
  publicationId!: string;

  @IsBoolean()
  isAnonymous!: boolean;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  content!: string;
}
