import { IAlbum } from 'src/albums/entities/album.entity';
import { IArtist } from 'src/artists/entities/artist.entity';
import { IFavorite } from 'src/favorites/entities/favorite.entity';
import { ITrack } from 'src/tracks/entities/track.entity';
import { IUser } from 'src/users/entities/user.entity';

export interface IDatabase {
  users: IUser[];
  artists: IArtist[];
  tracks: ITrack[];
  albums: IAlbum[];
  favorites: IFavorite;
}
