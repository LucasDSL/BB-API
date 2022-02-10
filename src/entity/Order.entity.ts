import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  ManyToMany,
} from "typeorm"
import { Customers } from "./Customer.entity"
import { Products } from "./Product.entity"

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToMany(() => Customers, { onDelete: "CASCADE" })
  @JoinColumn()
  customer: Customers

  @ManyToMany(() => Products)
  @JoinColumn()
  product: Products

  @Column()
  quantity: number
}
