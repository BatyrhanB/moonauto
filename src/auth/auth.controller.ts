import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SendOtpRequestDto } from './dto/send-otp.request.dto';
import { SendOtpResponseDto } from './dto/send-otp.response.dto';
import { VerifyOtpRequestDto } from './dto/verify-otp.request.dto';
import { AuthTokensResponseDto } from './dto/auth-tokens.response.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserEntity } from '../modules/users';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register/send-otp')
  @HttpCode(HttpStatus.OK)
  sendOtp(@Body() dto: SendOtpRequestDto): Promise<SendOtpResponseDto> {
    return this.authService.sendOtp(dto);
  }

  @Post('register/verify-otp')
  @HttpCode(HttpStatus.OK)
  verifyOtp(@Body() dto: VerifyOtpRequestDto): Promise<AuthTokensResponseDto> {
    return this.authService.verifyOtpAndRegister(dto);
  }

  @Post('me')
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  getMe(@Request() req: { user: UserEntity }): UserEntity {
    return req.user;
  }
}