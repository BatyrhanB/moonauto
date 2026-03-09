import { IsPhoneNumber, IsString } from 'class-validator';

export class SendOtpRequestDto {
  @IsPhoneNumber()
  @IsString()
  phoneNumber: string;
}