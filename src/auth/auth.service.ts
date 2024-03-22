import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}

  public async logIn(authDto: AuthDto) {
    const user = await this.userService.findOne(authDto.login);
    if (user?.password !== authDto.password) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;    
    return result;
  }

  public async signUp(authDto: AuthDto) {
    return await this.userService.create(authDto);
  }

}
