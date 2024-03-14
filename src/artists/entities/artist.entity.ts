import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Artist implements IArtist {
  @PrimaryGeneratedColumn('uuid', { name: 'artist_id' })  
  id: string;
  @Column()
  name: string;
  @Column()
  grammy: boolean;
}

export interface IArtist {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
}
