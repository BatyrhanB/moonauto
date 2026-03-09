import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { OTP_SERVICE } from './interfaces/otp-service.interface';
import type { IOtpService } from './interfaces/otp-service.interface';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SendOtpRequestDto } from './dto/send-otp.request.dto';
import { SendOtpResponseDto } from './dto/send-otp.response.dto';
import { VerifyOtpRequestDto } from './dto/verify-otp.request.dto';
import { AuthTokensResponseDto } from './dto/auth-tokens.response.dto';
import { UserStatus } from '../users';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @Inject(OTP_SERVICE) private readonly otpService: IOtpService,
  ) {}

  async sendOtp(dto: SendOtpRequestDto): Promise<SendOtpResponseDto> {
    await this.otpService.sendOtp(dto.phoneNumber);
    return new SendOtpResponseDto('Код подтверждения успешно отправлено!');
  }

  async verifyOtpAndRegister(dto: VerifyOtpRequestDto): Promise<AuthTokensResponseDto> {
    const isValid = await this.otpService.verifyOtp(dto.phoneNumber, dto.otpCode);
    if (!isValid) {
      throw new UnauthorizedException('Неправильный или истекший код подтверждения!');
    }

    let user = await this.usersService.findByPhoneNumber(dto.phoneNumber);

    if (!user) {
      if (!dto.firstName || !dto.lastName) {
        throw new BadRequestException('ФИО обязателен к заполнению для новых пользователей');
      }

      user = await this.usersService.createUser({
        phoneNumber: dto.phoneNumber,
        firstName: dto.firstName,
        lastName: dto.lastName,
        isPhoneVerified: true,
        status: UserStatus.ACTIVE,
      });
    } else {
      if (user.status === UserStatus.SUSPENDED) {
        throw new ConflictException('Ваш аккаунт заблокирован!');
      }
      user.isPhoneVerified = true;
      user.lastLoginAt = new Date();
      await this.usersService.save(user);
    }

    return this.generateTokens(user.id, user.phoneNumber, user.role);
  }

  private generateTokens(
    userId: string,
    phoneNumber: string,
    role: string,
  ): AuthTokensResponseDto {
    const payload: JwtPayload = { sub: userId, phoneNumber, role: role as any };

    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>('jwt.accessTokenExpiresIn') as any,
    });

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.configService.getOrThrow<string>('jwt.refreshTokenExpiresIn') as any,
    });

    return new AuthTokensResponseDto(accessToken, refreshToken);
  }
}