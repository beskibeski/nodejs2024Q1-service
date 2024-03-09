import { Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/database/database.service';
import { FavoritesResponse } from './entities/favorite.entity';

@Injectable()
export class FavoritesService {
  constructor(private databaseService: DataBaseService) {}

  public async findAll() {
    const { albums, artists, tracks } =
      await this.databaseService.getFavorites();
    const favoriteAlbums = albums.map((albumId) =>
      this.databaseService.getAlbumById(albumId),
    );
    const favoriteArtists = artists.map((artistId) =>
      this.databaseService.getArtistById(artistId),
    );
    const favoriteTracks = tracks.map((trackId) =>
      this.databaseService.getTrackById(trackId),
    );
    const favoriteResponse: FavoritesResponse = {
      albums: await Promise.all(favoriteAlbums),
      artists: await Promise.all(favoriteArtists),
      tracks: await Promise.all(favoriteTracks),
    };
    return favoriteResponse;
  }

  public async addAlbumToFavoritesById(id: string) {
    return await this.databaseService.addAlbumToFavorites(id);
  }

  public async deleteAlbumFromFavoritesById(id: string) {
    return await this.databaseService.deleteAlbumFromFavorites(id);
  }

  public async addArtistToFavoritesById(id: string) {
    return await this.databaseService.addArtistToFavorites(id);
  }

  public async deleteArtistFromFavoritesById(id: string) {
    return await this.databaseService.deleteArtistFromFavorites(id);
  }

  public async addTrackToFavoritesById(id: string) {
    return await this.databaseService.addTrackToFavorites(id);
  }

  public async deleteTrackFromFavoritesById(id: string) {
    return await this.databaseService.deleteTrackFromFavorites(id);
  }
}
