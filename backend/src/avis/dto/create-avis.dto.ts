import {
  IsBoolean,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateAvisDto {
  @IsBoolean()
  isAnonymous!: boolean;

  @ValidateIf((dto: CreateAvisDto) => !dto.isAnonymous)
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  authorName?: string;

  @IsString()
  @MinLength(20)
  @MaxLength(2000)
  content!: string;
}
