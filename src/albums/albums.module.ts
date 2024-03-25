import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { FavoriteAlbum } from 'src/favorites/entities/favorite.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Album, FavoriteAlbum])],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
