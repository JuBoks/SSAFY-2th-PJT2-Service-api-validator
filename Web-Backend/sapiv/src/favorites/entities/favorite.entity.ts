import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uid: string;

  @Column('int')
  meta_id: number;

  @Column('int')
  created_date: number;

  @Column('int')
  updated_date: number;

}
