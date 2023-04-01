import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_metadata")
export class Metadata {
  @PrimaryGeneratedColumn()
  meta_id: number;

  @Column("int")
  api_id: number;

  @Column('int')
  response_id: number;
  
  @Column('json')
  header: JSON;
  
  @Column('json')
  params: JSON;
  
  @Column('json')
  body: JSON;
  
  @Column()
  name: string;
  
  @Column('int')
  cycle_time: number;
  
  @Column('int')
  last_req_time: number;
  
  @Column()
  state: boolean;

  created_at: number;

  updated_at: number;

}
