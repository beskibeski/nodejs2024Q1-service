import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
  NotFoundException,
  HttpCode,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  public async create(
    @Body(new ValidationPipe()) createUserDto: CreateUserDto,
  ) {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  public async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const foundUser = await this.usersService.findOne(id);
    if (foundUser) {
      return foundUser;
    }
    throw new NotFoundException(`There is no user with id: ${id}`);
  }

  @Put(':id')
  public async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body(new ValidationPipe()) updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.usersService.update(id, updateUserDto);
    if (updatedUser) {
      return updatedUser;
    }
    if (updatedUser === undefined) {
      throw new NotFoundException(`There is no user with id: ${id}`);
    } else {
      throw new HttpException(
        'Please retype old password!',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const deletedUser = await this.usersService.remove(id);
    if (deletedUser) {
      return deletedUser;
    }
    throw new NotFoundException(`There is no user with id: ${id}`);
  }
}
