import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser, IUserResponse, User, UserResponse } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) 
    private readonly userRepository: Repository<User>
  ) {}

  public async create(createUserDto: CreateUserDto) {
    const createdUser: IUser = {
      id: randomUUID(),
      ...createUserDto,
      version: 1,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    await this.userRepository.save(createdUser);
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
    return await this.userRepository.find();
  }

  public async findOne(id: string) {
    return await this.userRepository.findOne({ where: { id } });
  }

  public async update(id: string, updateUserDto: UpdateUserDto) {
    const oldUser = await this.userRepository.findOne({ where: { id }})
    if (oldUser && oldUser.password === updateUserDto.oldPassword) {
      const updatedUser = {
        ...oldUser,
        password: updateUserDto.newPassword,
        version: (oldUser.version += 1),
        updatedAt: (oldUser.updatedAt = Date.now())
      };
      await this.userRepository.save(updatedUser);
      const updatedUserResponse: UserResponse = {
        id: updatedUser.id,
        login: updatedUser.login,
        version: updatedUser.version,
        createdAt: +updatedUser.createdAt,
        updatedAt: +updatedUser.updatedAt,
      };      
      return updatedUserResponse;
    };
    return oldUser ? '' : undefined;
  }

  public async remove(id: string) {
    return await this.userRepository.findOne({ where: { id } }) ? await this.userRepository.delete(id) : undefined;
  }
}
