import { IsPhoneNumber, IsString, Length, IsOptional } from 'class-validator';

export class VerifyOtpRequestDto {
  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;

  @IsString()
  @Length(4, 8)
  otpCode: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;
}