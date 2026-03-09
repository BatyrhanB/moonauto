import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { OtpService } from './otp.service';
import { TwilioService } from './twilio.service';
import { OTP_SERVICE } from './interfaces/otp-service.interface';
import { JwtStrategy } from './strategies/jwt.strategy';
import { UsersModule } from '../users/users.module';
import jwtConfig from '../config/jwt.config';
import twilioConfig from '../config/twilio.config';
import otpConfig from '../config/otp.config';

@Module({
  imports: [
    UsersModule,

    PassportModule.register({ defaultStrategy: 'jwt' }),

    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(twilioConfig),
    ConfigModule.forFeature(otpConfig),

    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow<string>('jwt.secret'),
        signOptions: {
          expiresIn: configService.getOrThrow('jwt.accessTokenExpiresIn') as unknown as number,
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    TwilioService,
    {
      provide: OTP_SERVICE,
      useClass: OtpService,
    },
  ],
})
export class AuthModule {}