import {
    IsString,
    IsEmail,
    IsOptional,
    MinLength,
    MaxLength,
    Matches,
  } from 'class-validator';
  
  import { Transform } from 'class-transformer';
  
  export class CreateParticipationDto {
    @Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(2)
    @MaxLength(120)
    fullName!: string;
  
    @Transform(({ value }) =>
      typeof value === 'string'
        ? value.trim().toLowerCase()
        : value,
    )
    @IsEmail()
    @MaxLength(254)
    email!: string;
  
    @Transform(({ value }) =>
      typeof value === 'string'
        ? value.trim() || undefined
        : value,
    )
    @IsOptional()
    @IsString()
    @MaxLength(25)
    @Matches(/^\+?[0-9\s().-]+$/)
    phone?: string;
  
    @Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(2)
    @MaxLength(100)
    province!: string;
  
    @Transform(({ value }) =>
      typeof value === 'string' ? value.trim() : value,
    )
    @IsString()
    @MinLength(20)
    @MaxLength(1500)
    motivation!: string;
  }