import { Album } from "src/albums/entities/album.entity";
import { Artist } from "src/artists/entities/artist.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Track implements ITrack {
  @PrimaryGeneratedColumn('uuid', { name: 'track_id'})
  id: string;
  @Column()
  name: string;
  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL' })
  @JoinColumn({ name: 'artist_id'})
  artist: Artist
  @Column({ nullable: true })
  artistId: string | null;
  @ManyToOne(() => Album, (album) => album.id, {
    onDelete: 'SET NULL' })
  @JoinColumn({ name: 'album_id'})
  album: Album
  @Column({ nullable: true })
  albumId: string | null;
  @Column()
  duration: number;
}

export interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}
