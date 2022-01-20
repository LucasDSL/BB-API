import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Customers {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  name: string

  @Column("text")
  customerAddress: string

  @Column()
  cpf: number

  @Column()
  cellphone: number
}
