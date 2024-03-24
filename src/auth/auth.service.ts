import { ForbiddenException, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { hash, compare } from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async logIn(authDto: AuthDto) {
    const user = await this.userService.findLogin(authDto.login);
      if (user && await compare (authDto.password, user.password)) {
      const payload = { userId: user.id, login: user.login };
      return {
        accessToken: await this.jwtService.signAsync(payload),
        refreshToken: await this.jwtService.signAsync(payload, {
          secret: await this.configService.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: await this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        })
      };
    };
    throw new ForbiddenException();
  }

  public async signUp(authDto: AuthDto) {
    const hashedAuthDto = { login: authDto.login, password: await this.hashPassword(authDto.password) };
    return await this.userService.create(hashedAuthDto);
  }

  private async hashPassword(password: string) {
    return await hash(password, +this.configService.get('CRYPT_SALT'));
  }

}
