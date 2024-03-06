import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private databaseService: DataBaseService) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  };

  public findAll() {
    return this.databaseService.getUsers();
  };

  findOne(id: number) {
    return `This action returns a #${id} user`;
  };

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  };

  remove(id: number) {
    return `This action removes a #${id} user`;
  };
}
