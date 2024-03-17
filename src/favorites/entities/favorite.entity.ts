import { Album, IAlbum } from 'src/albums/entities/album.entity';
import { Artist, IArtist } from 'src/artists/entities/artist.entity';
import { ITrack, Track } from 'src/tracks/entities/track.entity';
import { Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FavoriteAlbum {
  @PrimaryColumn('uuid')
  id: string;
  @OneToOne(() => Album, (album) => album.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  track: IAlbum
}

@Entity()
export class FavoriteArtist {
  @PrimaryColumn('uuid')
  id: string;
  @OneToOne(() => Artist, (artist) => artist.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  track: IArtist
}

@Entity()
export class FavoriteTrack {  
  @PrimaryColumn('uuid')
  id: string;
  @OneToOne(() => Track, (track) => track.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'id' })
  track: ITrack 
}

export class FavoritesResponse implements IFavorite {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}

export interface IFavorite {
  artists: IArtist[];
  albums: IAlbum[];
  tracks: ITrack[];
}
