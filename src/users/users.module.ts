import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataBaseModule } from 'src/database/database.module';

@Module({
  imports: [DataBaseModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
