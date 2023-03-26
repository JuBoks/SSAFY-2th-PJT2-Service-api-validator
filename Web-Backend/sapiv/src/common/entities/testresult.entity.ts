import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_test_result")
export class TestResult {
  @PrimaryGeneratedColumn()
  result_id: number;

  @Column('int')
  meta_id: number;
  
  @Column('int')
  data_id: number;
  
  @Column('int')
  action_id: number;
  
  @Column('int')
  response_id: number;
  
  @Column('json')
  response: JSON;
  
  @Column()
  result: boolean;

  created_at: number;

  updated_at: number;

}
