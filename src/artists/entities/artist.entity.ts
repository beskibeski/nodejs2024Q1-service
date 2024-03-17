import { Album, IAlbum } from 'src/albums/entities/album.entity';
import { FavoriteArtist } from 'src/favorites/entities/favorite.entity';
import { ITrack, Track } from 'src/tracks/entities/track.entity';
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
  @OneToMany(() => Track, (track) => track.artistId)
  @JoinColumn({ name: 'id' })
  tracks: ITrack[]
  @OneToMany(() => Album, (album) => album.artistId)
  @JoinColumn({ name: 'id' })
  albums: IAlbum[]  
}

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
