import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from "typeorm"
import { Customers } from "./Customer.entity"
import { Products } from "./Product.entity"

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number

  @OneToOne(() => Customers)
  @JoinColumn()
  customer: Customers

  @OneToOne(() => Products)
  @JoinColumn()
  product: Products

  @Column()
  quantity: number
}
