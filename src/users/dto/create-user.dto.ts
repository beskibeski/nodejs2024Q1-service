import { IsNotEmpty } from "class-validator";
import { IUser } from "../entities/user.entity";

export class CreateUserDto implements Partial<IUser>{
  @IsNotEmpty()
  login: string;
  @IsNotEmpty()
  password: string;
}
