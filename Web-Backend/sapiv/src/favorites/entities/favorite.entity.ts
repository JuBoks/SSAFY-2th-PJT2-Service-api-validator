import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_favorite_api")
export class Favorite {
  @PrimaryGeneratedColumn()
  favorite_id: number;

  @Column()
  user_id: string;

  @Column('int')
  meta_id: number;

  created_at: number;

  updated_at: number;

}
