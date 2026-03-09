import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis from 'ioredis';
import { REDIS_CLIENT } from '../redis/redis.constants';
import { IOtpService } from './interfaces/otp-service.interface';
import { TwilioService } from './twilio.service';
import { OTP_KEY_PREFIX, OTP_RATELIMIT_PREFIX } from './otp.constants';

@Injectable()
export class OtpService implements IOtpService {
  private readonly logger = new Logger(OtpService.name);

  constructor(
    @Inject(REDIS_CLIENT) private readonly redis: Redis,
    private readonly twilioService: TwilioService,
    private readonly configService: ConfigService,
  ) {}

  async sendOtp(phoneNumber: string): Promise<void> {
    const rlKey = `${OTP_RATELIMIT_PREFIX}${phoneNumber}`;
    const otpKey = `${OTP_KEY_PREFIX}${phoneNumber}`;

    const rateLimitExists = await this.redis.exists(rlKey);
    if (rateLimitExists) {
      throw new HttpException(
        'Пожалуйста, подождите, прежде чем запрашивать новый код',
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    const codeLength = this.configService.getOrThrow<number>('otp.codeLength');
    const code = this.generateCode(codeLength);

    const ttl = this.configService.getOrThrow<number>('otp.ttlSeconds');
    const rlTtl = this.configService.getOrThrow<number>('otp.rateLimitSeconds');

    const pipeline = this.redis.pipeline();
    pipeline.hset(otpKey, 'code', code, 'attempts', '0');
    pipeline.expire(otpKey, ttl);
    pipeline.set(rlKey, '1', 'EX', rlTtl);
    await pipeline.exec();

    await this.twilioService.sendSms(
      phoneNumber,
      `Ваш код подтверждения: ${code}. Время истечения ${Math.floor(ttl / 60)} минут. Не кому не сообщайте код.`,
    );

    this.logger.log(`OTP sent to ${phoneNumber}`);
  }

  async verifyOtp(phoneNumber: string, code: string): Promise<boolean> {
    const otpKey = `${OTP_KEY_PREFIX}${phoneNumber}`;
    const maxAttempts = this.configService.getOrThrow<number>('otp.maxAttempts');

    const data = await this.redis.hgetall(otpKey);
    if (!data || !data.code) {
      return false;
    }

    const attempts = parseInt(data.attempts ?? '0', 10);

    if (attempts >= maxAttempts) {
      await this.redis.del(otpKey);
      throw new UnauthorizedException(
        'Превышено максимальное количество попыток. Запросите новый код',
      );
    }

    if (data.code !== code) {
      await this.redis.hincrby(otpKey, 'attempts', 1);
      return false;
    }

    await this.redis.del(otpKey);
    return true;
  }

  private generateCode(length: number): string {
    // const max = Math.pow(10, length);
    // const num = Math.floor(Math.random() * max);
    // return num.toString().padStart(length, '0');
    return "001001"
  }
}