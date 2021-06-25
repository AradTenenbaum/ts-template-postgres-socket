import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity("examples")
export default class Example {
  @PrimaryColumn({ name: "id" })
  id: string;

  @Column()
  value: string;
}
