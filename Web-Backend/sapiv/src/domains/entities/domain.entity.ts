import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_domain")
export class Domain {
  @PrimaryGeneratedColumn()
  domain_id: number;

  @Column("int")
  category_id: number;

  @Column()
  name: string;
  
  @Column()
  domain: string;
      
  @Column()
  state: boolean;

  created_at: number;

  updated_at: number;

}
