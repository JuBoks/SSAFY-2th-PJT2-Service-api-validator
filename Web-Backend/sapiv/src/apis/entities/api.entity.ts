import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_api")
export class Api {
  @PrimaryGeneratedColumn()
  api_id: number;

  @Column("int")
  domain_id: number;

  @Column()
  method: number;
  
  @Column()
  resources: string;
      
  @Column()
  state: boolean;

  created_at: number;

  updated_at: number;

}
