import { Body, Controller, HttpCode, HttpException, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RefreshTokenDto } from './dto/refresh.dto';
import { Public } from './auth.public';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  public async signUp(@Body(new ValidationPipe()) authDto: AuthDto) {
    return await this.authService.signUp(authDto);
  }

  @Public()
  @Post('login')
  @HttpCode(200)
  public async logIn(@Body(new ValidationPipe()) authDto: AuthDto) {
    return this.authService.logIn(authDto);
  }

  @Post('refresh')
  @HttpCode(200)
  public async refresh(@Body() refreshTokenDto: RefreshTokenDto) {
    if(!refreshTokenDto.refreshToken.length) {
      throw new HttpException('dto is invalid (no refreshToken in body)', 401);
    }
    return this.authService.refresh(refreshTokenDto);    
  }  

}
