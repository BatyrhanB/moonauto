import { Injectable } from '@nestjs/common';
import { IOtpService } from './interfaces/otp-service.interface';

@Injectable()
export class OtpService implements IOtpService {
  async sendOtp(phoneNumber: string): Promise<void> {
    /// TODO: Implement OTP send code
  }

  async verifyOtp(phoneNumber: string, code: string): Promise<boolean> {
    return true; /// TODO: Implement OTP verify
  }
}