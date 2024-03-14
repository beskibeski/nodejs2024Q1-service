import { Artist } from 'src/artists/entities/artist.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn('uuid', { name: 'album_id'})
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @ManyToOne(() => Artist, (artist) => artist.id, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({ name: 'artist_id'})
  artist: Artist | null;
  @Column({ nullable: true })
  artistId: string | null;
  }

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
