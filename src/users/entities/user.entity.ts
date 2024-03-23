import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User implements IUser {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;
  @Column()
  login: string;
  @Column()
  password: string;
  @Column()
  version: number;
  @Column('bigint')
  createdAt: number;
  @Column('bigint')
  updatedAt: number;
}

export interface IUser {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number; // timestamp of last update
}
