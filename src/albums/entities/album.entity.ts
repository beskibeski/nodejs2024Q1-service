import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Album implements IAlbum {
  @PrimaryGeneratedColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  year: number;
  @Column()
  artistId: string | null;
}

export interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Artist
}
