import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("favorites")
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  name!: string;

  @Column('text')
  description!: string;

  @Column()
  filename!: string;

  @Column('int')
  views!: number;

}
