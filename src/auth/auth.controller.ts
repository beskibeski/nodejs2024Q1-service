import { Body, Controller, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public async signUp(@Body(new ValidationPipe()) authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @Post('login')
  public async logIn(@Body(new ValidationPipe()) authDto: AuthDto) {
    return this.authService.logIn(authDto);
  }

}
