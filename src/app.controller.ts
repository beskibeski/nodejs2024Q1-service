import { Controller, Get } from '@nestjs/common';
import { Public } from './auth/auth.public';

@Controller()
export class AppController {
  @Public()
  @Get('')
  public async getHello() {
    return '<h1 style="text-align:center">Welcome to HOME MUSIC LIBRARY!!!</h1>';
  }
}
