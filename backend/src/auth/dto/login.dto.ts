import {
  IsDefined,
  IsEmail,
  IsString,
  MaxLength,
} from 'class-validator';

export class LoginDto {
  @IsDefined()
  @IsEmail()
  @MaxLength(254)
  email!: string;

  @IsDefined()
  @IsString()
  password!: string;
}
