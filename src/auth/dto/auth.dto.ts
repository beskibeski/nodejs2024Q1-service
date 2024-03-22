import { IsNotEmpty, IsString } from 'class-validator';
import { IUser } from 'src/users/entities/user.entity';

export class AuthDto implements Partial<IUser> {
  @IsNotEmpty()
  @IsString()
  login: string;
  @IsNotEmpty()
  @IsString()
  password: string;
}