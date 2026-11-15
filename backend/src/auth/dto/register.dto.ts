
import {
    IsDefined,
    IsEmail,
    IsString,
    IsUUID,
    Length,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';
  
  export class RegisterDto {
    @IsDefined()
    @IsString()
    @Length(2, 150)
    fullName!: string;
  
    @IsDefined()
    @IsString()
    @IsEmail()
    @MaxLength(254)
    email!: string;
  
    @IsDefined()
    @IsString()
    @MinLength(12)
    @MaxLength(128)
    @Matches(/^[^\u0000]*$/u)
    password!: string;
  
    @IsDefined()
    @IsUUID('4')
    provinceId!: string;
  }
  