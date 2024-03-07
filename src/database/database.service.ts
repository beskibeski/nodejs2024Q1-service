import { Injectable, NotFoundException } from '@nestjs/common';
import { IDatabase } from './entities/database.entity';
import { Artist, IArtist } from 'src/artists/entities/artist.entity';
import { IAlbum } from 'src/albums/entities/album.entity';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { ITrack } from 'src/tracks/entities/track.entity';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { IUser } from 'src/users/entities/user.entity';

@Injectable()
export class DataBaseService {
  private database: IDatabase = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: [],
  };

  public async setUser(user: IUser) {
    return this.database.users.push(user);
  };

  public async getUsers() {
    return this.database.users;
  };

  public async setArtist(artist: IArtist) {
    this.database.artists.push(artist);
    return artist;
  };

  public async getArtists() {
    return this.database.artists;
  };
  
  public async getArtistById(id: string) {
    return this.database.artists.find((artist) => artist.id === id);
  };

  public async changeArtistById(id: string, updatedArtistData: UpdateArtistDto) {
    this.database.artists = this.database.artists.map((artist: IArtist) => 
      artist.id === id ? { ...artist, ...updatedArtistData } : artist
    );
    return this.database.artists.find((artist) => artist.id === id);
  };

  public async deleteArtistById(id: string) {
    const deletedArtist = this.database.artists.find((artist) => artist.id === id);
    if (deletedArtist) {
      this.database.artists = this.database.artists.filter((artist) => artist.id !== id);
      this.database.tracks = this.database.tracks.map((track) =>
        track.artistId === id ? { ...track, artistId: null } : track
      );
      this.database.albums = this.database.albums.map((album) => 
        album.artistId === id ? { ...album,  artistId: null } : album
      );
      return deletedArtist;
    };
    return undefined;
  };

  public async setTrack(track: ITrack) {
    this.database.tracks.push(track);
    return track;
  }

  public async getTracks() {
    return this.database.tracks;
  }; 

  public async getTrackById(id: string) {
    return this.database.tracks.find((track) => track.id === id);
  };

  public async changeTrackById(id: string, updatedTrackData: UpdateTrackDto) {
    this.database.tracks = this.database.tracks.map((track: ITrack) => 
      track.id === id ? { ...track, ...updatedTrackData } : track
    );    
    return this.database.tracks.find((track) => track.id === id);
  };

  public async deleteTrackById(id: string) {
    const deletedTrack = this.database.tracks.find((track) => track.id === id);
    if (deletedTrack) {
      this.database.tracks = this.database.tracks.filter((track) => track.id !== id);
      return deletedTrack;
    }
    return undefined;
  };

  public async setAlbum(album: IAlbum) {
    this.database.albums.push(album);
    return album;
  };

  public async getAlbums() {
    return this.database.albums;
  };

  public async getAlbumById(id: string) {
    return this.database.albums.find((album) => album.id === id);
  };

  public async changeAlbumById(id: string, updatedAlbumData: UpdateAlbumDto) {
    this.database.albums = this.database.albums.map((album: IAlbum) => 
      album.id === id ? { ...album, ...updatedAlbumData } : album
    );
    return this.database.albums.find((album) => album.id === id);
  };

  public async deleteAlbumById(id: string) {
    const deletedAlbum = this.database.albums.find((album) => album.id === id);
    if (deletedAlbum) {
      this.database.albums = this.database.albums.filter((album) => album.id !== id);
      this.database.tracks = this.database.tracks.map((track) => 
        track.albumId === deletedAlbum.id ? { ...track,  albumId: null } : track
      );
      return deletedAlbum;      
    };
    return undefined;
  };

  public async getFavorites() {
    return this.database.albums;
  };
};
