import { Artist, IArtist } from 'src/artists/entities/artist.entity';
import { FavoriteAlbum } from 'src/favorites/entities/favorite.entity';
import { ITrack, Track } from 'src/tracks/entities/track.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artistId' })
  artist: IArtist | null;
  @Column({ nullable: true })
  artistId: string | null;
  @OneToMany(() => Track, (track) => track.albumId)
  @JoinColumn({ name: 'id' })
  tracks: ITrack[]
}

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
