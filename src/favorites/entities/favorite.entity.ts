import { IAlbum } from 'src/albums/entities/album.entity';
import { IArtist } from 'src/artists/entities/artist.entity';
import { ITrack } from 'src/tracks/entities/track.entity';

export class Favorite implements IFavorite {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export class FavoritesResponse implements IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IFavorite {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids
}

export interface IFavoritesResponse {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
