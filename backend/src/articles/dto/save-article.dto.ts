import { Transform } from 'class-transformer';
import {
  IsString,
  IsIn,
  MinLength,
  MaxLength,
} from 'class-validator';

export class SaveArticleDto {
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(3)
  @MaxLength(250)
  title!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  summary!: string;

  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value)
  @IsString()
  @MinLength(20)
  @MaxLength(50000)
  content!: string;

  @IsIn(['POLITIQUE', 'ECONOMIE'])
  category!: 'POLITIQUE' | 'ECONOMIE';
}