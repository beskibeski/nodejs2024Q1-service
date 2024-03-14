import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Track implements ITrack {
  @PrimaryColumn()
  id: string;
  @Column()
  name: string;
  @Column()
  artistId: string | null;
  @Column()
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
