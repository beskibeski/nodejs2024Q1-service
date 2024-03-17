import { Injectable } from '@nestjs/common';
import {
  FavoriteAlbum,
  FavoriteArtist,
  FavoriteTrack,
  FavoritesResponse,
} from './entities/favorite.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Track } from 'src/tracks/entities/track.entity';
import { Album } from 'src/albums/entities/album.entity';
import { Artist } from 'src/artists/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectRepository(FavoriteAlbum)
    private readonly favoriteAlbumRepository: Repository<FavoriteAlbum>,
    @InjectRepository(Album)
    private readonly albumRepository: Repository<Album>,
    @InjectRepository(Artist)
    private readonly artistRepository: Repository<Artist>,
    @InjectRepository(Track)
    private readonly trackRepository: Repository<Track>,
    @InjectRepository(FavoriteArtist)
    private readonly favoriteArtistRepository: Repository<FavoriteArtist>,
    @InjectRepository(FavoriteTrack)
    private readonly favoriteTrackRepository: Repository<FavoriteTrack>,
  ) {}

  public async findAll() {
    const albums = await this.favoriteAlbumRepository.find();
    const favoriteAlbums = albums.map(async (album) => {
      const id = album.id;
      return await this.albumRepository.findOne({ where: { id } });
    });
    const artists = await this.favoriteArtistRepository.find();
    const favoriteArtists = artists.map(async (artist) => {
      const id = artist.id;
      return await this.artistRepository.findOne({ where: { id } });
    });
    const tracks = await this.favoriteTrackRepository.find();
    const favoriteTracks = tracks.map(async (track) => {
      const id = track.id;
      return await this.trackRepository.findOne({ where: { id } });
    });
    const favoriteResponse: FavoritesResponse = {
      albums: await Promise.all(favoriteAlbums),
      artists: await Promise.all(favoriteArtists),
      tracks: await Promise.all(favoriteTracks),
    };
    return favoriteResponse;
  }

  public async addAlbumToFavoritesById(id: string) {
    const addedAlbum = await this.albumRepository.findOne({ where: { id } });
    if (addedAlbum) {
      await this.favoriteAlbumRepository.save({ id });
    }
    return addedAlbum;
  }

  public async deleteAlbumFromFavoritesById(id: string) {
    const deletedAlbum = await this.favoriteAlbumRepository.findOne({
      where: { id },
    });
    if (deletedAlbum) {
      await this.favoriteAlbumRepository.delete(id);
    }
    return deletedAlbum;
  }

  public async addArtistToFavoritesById(id: string) {
    const addedArtist = await this.artistRepository.findOne({ where: { id } });
    if (addedArtist) {
      await this.favoriteArtistRepository.save({ id });
    }
    return addedArtist;
  }

  public async deleteArtistFromFavoritesById(id: string) {
    const deletedArtist = await this.favoriteArtistRepository.findOne({
      where: { id },
    });
    if (deletedArtist) {
      await this.favoriteArtistRepository.delete(id);
    }
    return deletedArtist;
  }

  public async addTrackToFavoritesById(id: string) {
    const addedTrack = await this.trackRepository.findOne({ where: { id } });
    if (addedTrack) {
      await this.favoriteTrackRepository.save({ id });
    }
    return addedTrack;
  }

  public async deleteTrackFromFavoritesById(id: string) {
    const deletedTrack = await this.favoriteTrackRepository.findOne({
      where: { id },
    });
    if (deletedTrack) {
      await this.favoriteTrackRepository.delete(id);
    }
    return deletedTrack;
  }
}
