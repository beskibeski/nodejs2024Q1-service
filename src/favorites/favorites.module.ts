import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
} from './entities/favorite.entity';
import { Artist } from 'src/artists/entities/artist.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Track } from 'src/tracks/entities/track.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Album,
      Artist,
      Track,
      FavoriteAlbum,
      FavoriteArtist,
      FavoriteTrack,
    ]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
})
export class FavoritesModule {}
