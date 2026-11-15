import { IsDefined, IsEmail, IsString, MaxLength } from 'class-validator';

export class ResendVerificationDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  @MaxLength(254)
  email!: string;
}
