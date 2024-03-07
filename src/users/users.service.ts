import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBaseService } from 'src/database/database.service';
import { IUser } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private databaseService: DataBaseService) {}

  public async create(createUserDto: CreateUserDto) {
    const user: IUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    }
    await this.databaseService.setUser(user);
  };

  public async findAll() {
    return await this.databaseService.getUsers();
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
