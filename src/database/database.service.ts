import { Injectable } from '@nestjs/common';
import { IDatabase } from './entities/database.entity';
import { IArtist } from 'src/artists/entities/artist.entity';
import { IAlbum } from 'src/albums/entities/album.entity';
import { UpdateAlbumDto } from 'src/albums/dto/update-album.dto';
import { UpdateArtistDto } from 'src/artists/dto/update-artist.dto';
import { ITrack } from 'src/tracks/entities/track.entity';
import { UpdateTrackDto } from 'src/tracks/dto/update-track.dto';
import { IUser } from 'src/users/entities/user.entity';
import { IFavorite } from 'src/favorites/entities/favorite.entity';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class DataBaseService {
  private database: IDatabase = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: {
      albums: [],
      artists: [],
      tracks: [],
    },
  };
   
  public async setArtist(artist: IArtist) {
    this.database.artists.push(artist);
    return artist;
  }

  public async getArtists() {
    return this.database.artists;
  }

  public async getArtistById(id: string) {
    return this.database.artists.find((artist) => artist.id === id);
  }

  public async changeArtistById(
    id: string,
    updatedArtistData: UpdateArtistDto,
  ) {
    this.database.artists = this.database.artists.map((artist: IArtist) =>
      artist.id === id ? { ...artist, ...updatedArtistData } : artist,
    );
    return this.database.artists.find((artist) => artist.id === id);
  }

  public async deleteArtistById(id: string) {
    const deletedArtist = this.database.artists.find(
      (artist) => artist.id === id,
    );
    if (deletedArtist) {
      this.database.artists = this.database.artists.filter(
        (artist) => artist.id !== id,
      );
      this.database.tracks = this.database.tracks.map((track) =>
        track.artistId === id ? { ...track, artistId: null } : track,
      );
      this.database.albums = this.database.albums.map((album) =>
        album.artistId === id ? { ...album, artistId: null } : album,
      );
      this.database.favorites.artists = this.database.favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    }
    return deletedArtist;
  }

  public async setTrack(track: ITrack) {
    this.database.tracks.push(track);
    return track;
  }

  public async getTracks() {
    return this.database.tracks;
  }

  public async getTrackById(id: string) {
    return this.database.tracks.find((track) => track.id === id);
  }

  public async changeTrackById(id: string, updatedTrackData: UpdateTrackDto) {
    this.database.tracks = this.database.tracks.map((track: ITrack) =>
      track.id === id ? { ...track, ...updatedTrackData } : track,
    );
    return this.database.tracks.find((track) => track.id === id);
  }

  public async deleteTrackById(id: string) {
    const deletedTrack = this.database.tracks.find((track) => track.id === id);
    if (deletedTrack) {
      this.database.tracks = this.database.tracks.filter(
        (track) => track.id !== id,
      );
      this.database.favorites.tracks = this.database.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }
    return deletedTrack;
  }

  public async setAlbum(album: IAlbum) {
    this.database.albums.push(album);
    return album;
  }

  public async getAlbums() {
    return this.database.albums;
  }

  public async getAlbumById(id: string) {
    return this.database.albums.find((album) => album.id === id);
  }

  public async changeAlbumById(id: string, updatedAlbumData: UpdateAlbumDto) {
    this.database.albums = this.database.albums.map((album: IAlbum) =>
      album.id === id ? { ...album, ...updatedAlbumData } : album,
    );
    return this.database.albums.find((album) => album.id === id);
  }

  public async deleteAlbumById(id: string) {
    const deletedAlbum = this.database.albums.find((album) => album.id === id);
    if (deletedAlbum) {
      this.database.albums = this.database.albums.filter(
        (album) => album.id !== id,
      );
      this.database.tracks = this.database.tracks.map((track) =>
        track.albumId === deletedAlbum.id ? { ...track, albumId: null } : track,
      );
      this.database.favorites.albums = this.database.favorites.albums.filter(
        (albumId) => albumId !== id,
      );
    }
    return deletedAlbum;
  }

  public async getFavorites(): Promise<IFavorite> {
    return {
      albums: this.database.favorites.albums,
      artists: this.database.favorites.artists,
      tracks: this.database.favorites.tracks,
    };
  }

  public async addAlbumToFavorites(id: string) {
    const addedAlbum = this.database.albums.find((album) => album.id === id);
    if (addedAlbum) {
      this.database.favorites.albums.push(id);
    }
    return addedAlbum;
  }

  public async deleteAlbumFromFavorites(id: string) {
    const deletedAlbum = this.database.favorites.albums.find(
      (albumId) => albumId === id,
    );
    if (deletedAlbum) {
      this.database.favorites.albums = this.database.favorites.albums.filter(
        (albumId) => albumId !== id,
      );
    }
    return deletedAlbum;
  }

  public async addArtistToFavorites(id: string) {
    const addedArtist = this.database.artists.find(
      (artist) => artist.id === id,
    );
    if (addedArtist) {
      this.database.favorites.artists.push(id);
    }
    return addedArtist;
  }

  public async deleteArtistFromFavorites(id: string) {
    const deletedArtist = this.database.favorites.artists.find(
      (atistId) => atistId === id,
    );
    if (deletedArtist) {
      this.database.favorites.artists = this.database.favorites.artists.filter(
        (artistId) => artistId !== id,
      );
    }
    return deletedArtist;
  }

  public async addTrackToFavorites(id: string) {
    const addedTrack = this.database.tracks.find((track) => track.id === id);
    if (addedTrack) {
      this.database.favorites.tracks.push(id);
    }
    return addedTrack;
  }

  public async deleteTrackFromFavorites(id: string) {
    const deletedTrack = this.database.favorites.tracks.find(
      (trackId) => trackId === id,
    );
    if (deletedTrack) {
      this.database.favorites.tracks = this.database.favorites.tracks.filter(
        (trackId) => trackId !== id,
      );
    }
    return deletedTrack;
  }
}
