import { Injectable } from '@nestjs/common';
import { IDatabase } from './entities/database.entity';

@Injectable()
export class DataBaseService {
  private database: IDatabase = {
    users: [
      {
        id: '82578528-8d66-439b-b79c-2b95bf43bec6',
        login: '11111',
        password: '111111',
        version: 0,
        createdAt: 111111,
        updatedAt: 111111,
      }
    ],
    artists: [
      {
        id: '82578529-8d66-439b-b79c-2b95bf43bec6',
        name: 'Vasyok',
        grammy: true,
      }
    ],
    tracks: [
      {
        id: '83578529-8d66-439b-b79c-2b95bf43bec6',
        name: 'Grib',
        artistId: '82578528-8d66-439b-b79c-2b95bf43bec6',
        albumId: '92578529-8d66-439b-b79c-2b95bf43bec6',
        duration: 45,
      },
    ],
    albums: [      
    ],
    favorites: [],
  };

  public getUsers() {
    return this.database.users;
  };

  public getArtists() {
    return this.database.artists;
  };

  public getTracks() {
    return this.database.tracks;
  };

  public getAlbums() {
    return this.database.albums;
  };

  public getFavorites() {
    return this.database.albums;
  };
};
