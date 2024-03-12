import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DataBaseService } from 'src/database/database.service';
import { IUser, IUserResponse, UserResponse } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private databaseService: DataBaseService) {}

  public async create(createUserDto: CreateUserDto) {
    const createdUser: IUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.databaseService.setUser(createdUser);
    const createdUserWithoutPassword: IUserResponse = {
      id: createdUser.id,
      login: createdUser.login,
      version: createdUser.version,
      createdAt: createdUser.createdAt,
      updatedAt: createdUser.updatedAt,
    };
    return createdUserWithoutPassword;
  }

  public async findAll() {
    return await this.databaseService.getUsers();
  }

  public async findOne(id: string) {
    return await this.databaseService.getUserById(id);
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUser = await this.databaseService.changeUserPassword(
      id,
      updateUserDto,
    );
    if (updatedUser) {
      const updatedUserWithoutPassword: UserResponse = {
        id: updatedUser.id,
        login: updatedUser.login,
        version: updatedUser.version,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      };
      return updatedUserWithoutPassword;
    }
    return updatedUser;
  }

  public async remove(id: string) {
    return await this.databaseService.deleteUserById(id);
  }
}
