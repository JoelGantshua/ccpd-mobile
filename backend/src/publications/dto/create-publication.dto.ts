import {
  IsIn,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePublicationDto {
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(2000)
  description?: string;

  @IsIn(['DOCUMENT', 'DOCTRINE'])
  type!: 'DOCUMENT' | 'DOCTRINE';

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(15)
  doctrineNumber?: number;

  @IsOptional()
  @IsIn(['COURTE', 'INTEGRALE'])
  doctrineVersion?: 'COURTE' | 'INTEGRALE';
}
