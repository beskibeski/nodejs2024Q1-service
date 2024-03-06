import { Injectable } from '@nestjs/common';
import { IDatabase } from './entities/database.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class DataBaseService {
  private database: IDatabase = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: [],
  };

  public async getUsers() {
    return this.database.users;
  };

  public async setArtist(artist: Artist) {
    this.database.artists.push(artist);
  }

  public async getArtists() {
    return this.database.artists;
  };
  
  public async getArtistById(id: string) {
    return this.database.artists.find((artist) => artist.id === id);
  };

  public async changeArtistById(id: string, artistData: Partial<Artist>) {
    this.database.artists = this.database.artists.map((artist: Artist) => 
      artist.id === id ? { id, name: artistData.name, grammy: artistData.grammy } : artist
    )
  };

  public async deleteArtistById(id: string) {
    this.database.artists = this.database.artists.filter((artist) => artist.id !== id);
  };

  public async getTracks() {
    return this.database.tracks;
  };

  public async getAlbums() {
    return this.database.albums;
  };

  public async getFavorites() {
    return this.database.albums;
  };
};
