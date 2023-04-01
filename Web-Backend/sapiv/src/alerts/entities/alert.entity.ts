import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tbl_alert_api")
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
