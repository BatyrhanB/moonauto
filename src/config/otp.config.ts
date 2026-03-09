import { registerAs } from '@nestjs/config';

export default registerAs('otp', () => ({
  ttlSeconds: parseInt(process.env.OTP_TTL_SECONDS ?? '300', 10),
  maxAttempts: parseInt(process.env.OTP_MAX_ATTEMPTS ?? '3', 10),
  rateLimitSeconds: parseInt(process.env.OTP_RATE_LIMIT_SECONDS ?? '60', 10),
  codeLength: parseInt(process.env.OTP_CODE_LENGTH ?? '6', 10),
}));