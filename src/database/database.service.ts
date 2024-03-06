import { Injectable } from '@nestjs/common';
import { IDatabase } from './entities/database.entity';
import { Artist, IArtist } from 'src/artists/entities/artist.entity';
import { IAlbum } from 'src/albums/entities/album.entity';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { ITrack } from 'src/tracks/entities/track.entity';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';

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

  public async setArtist(artist: IArtist) {
    this.database.artists.push(artist);
  }

  public async getArtists() {
    return this.database.artists;
  };
  
  public async getArtistById(id: string) {
    return this.database.artists.find((artist) => artist.id === id);
  };

  public async changeArtistById(id: string, artistData: UpdateArtistDto) {
    this.database.artists = this.database.artists.map((artist: IArtist) => 
      artist.id === id ? { id, name: artistData.name, grammy: artistData.grammy } : artist
    )
  };

  public async deleteArtistById(id: string) {
    this.database.artists = this.database.artists.filter((artist) => artist.id !== id);
  };

  public async setTrack(track: ITrack) {
    this.database.tracks.push(track);
  }

  public async getTracks() {
    return this.database.tracks;
  }; 

  public async getTrackById(id: string) {
    return this.database.tracks.find((track) =>track.id === id);
  };

  public async changeTrackById(id: string, trackData: UpdateTrackDto) {
    this.database.tracks = this.database.tracks.map((track: ITrack) => 
      track.id === id ? { ...track, name: trackData.name, duration: trackData.duration } : track
    )
  };

  public async deleteTrackById(id: string) {
    this.database.tracks = this.database.tracks.filter((track) => track.id !== id);
  };

  public async setAlbum(album: IAlbum) {
    this.database.albums.push(album);
  }

  public async getAlbums() {
    return this.database.albums;
  };

  public async getAlbumById(id: string) {
    return this.database.albums.find((album) => album.id === id);
  };

  public async changeAlbumById(id: string, albumData: UpdateAlbumDto) {
    this.database.albums = this.database.albums.map((album: IAlbum) => 
      album.id === id ? { ...album, name: albumData.name, year: albumData.year } : album
    )
  };

  public async deleteAlbumById(id: string) {
    this.database.albums = this.database.albums.filter((album) => album.id !== id);
  };

  public async getFavorites() {
    return this.database.albums;
  };
};
