import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Artist implements IArtist {
  @PrimaryColumn()  
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
