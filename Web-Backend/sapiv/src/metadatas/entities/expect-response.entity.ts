import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_expect_response_log")
export class ExpectResponse {
  @PrimaryGeneratedColumn()
  response_id: number;

  @Column("int")
  meta_id: number;
  
  @Column("int")
  data_id: number;
  
  @Column('json')
  response: JSON;
  
  created_at: number;

  updated_at: number;

}
