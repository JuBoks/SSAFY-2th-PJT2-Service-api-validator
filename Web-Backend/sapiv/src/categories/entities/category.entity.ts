import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_category")
export class Category {
  @PrimaryGeneratedColumn()
  category_id: number;

  @Column()
  name: string;
  
  @Column()
  note: string;
      
  @Column()
  state: boolean;

  created_at: number;

  updated_at: number;

}
