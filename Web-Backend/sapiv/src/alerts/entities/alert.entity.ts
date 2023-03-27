import { Column, PrimaryGeneratedColumn } from "typeorm";

export class Alert {
  @PrimaryGeneratedColumn()
  alert_id: number;

  @Column()
  user_id: string;

  @Column('int')
  meta_id: number;

  created_at: number;

  updated_at: number;
}
