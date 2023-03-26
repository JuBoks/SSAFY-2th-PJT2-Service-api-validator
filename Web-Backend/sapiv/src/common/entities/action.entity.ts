import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity("tbl_github_actions")
export class Action {
  @PrimaryGeneratedColumn()
  action_id: number;

  @Column('int')
  pass_cnt: number;
  
  @Column('int')
  fail_cnt: number;

  created_at: number;

  updated_at: number;

}
