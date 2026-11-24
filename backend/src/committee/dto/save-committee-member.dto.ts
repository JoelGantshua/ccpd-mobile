import { Transform } from 'class-transformer';
import {
  IsString,
  IsOptional,
  IsUUID,
  IsInt,
  Min,
  Max,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SaveCommitteeMemberDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(2)
  @MaxLength(150)
  fullName!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(2)
  @MaxLength(200)
  position!: string;

  @IsOptional()
  @IsString()
  @MaxLength(10000)
  biography?: string | null;

  @IsOptional()
  @IsUUID('4')
  provinceId?: string | null;

  @IsInt()
  @Min(0)
  @Max(10000)
  displayOrder!: number;
}