import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Twilio from 'twilio';

@Injectable()
export class TwilioService {
  private readonly client: Twilio.Twilio;
  private readonly logger = new Logger(TwilioService.name);

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.getOrThrow<string>('twilio.accountSid');
    const authToken = configService.getOrThrow<string>('twilio.authToken');
    this.client = Twilio(accountSid, authToken);
  }

  async sendSms(to: string, body: string): Promise<void> {
    const from = this.configService.getOrThrow<string>('twilio.fromNumber');
    try {
      // await this.client.messages.create({ to, from, body });
      this.logger.warn("SENDING CODE MOCKED");
    } catch (err) {
      this.logger.error(`Twilio SMS failed to ${to}`, err);
      throw new InternalServerErrorException('При отправке кода подтверждения произошла ошибка. Попробуйте позже');
    }
  }
}