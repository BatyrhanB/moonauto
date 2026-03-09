export const OTP_SERVICE = Symbol('OTP_SERVICE');

export interface IOtpService {
  sendOtp(phoneNumber: string): Promise<void>;

  verifyOtp(phoneNumber: string, code: string): Promise<boolean>;
}