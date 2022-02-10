import { createConnection } from "typeorm"
import { Orders } from "../../entity/Order.entity"
class OrderServices {
  async addOrderOnDB(order) {
    const conn = await createConnection()
    const orderCreated = await conn.manager.save(Orders, order)
    await conn.close()
    return orderCreated
  }

  async findById(orderId: number) {
    const conn = await createConnection()
    const order = await conn.manager.findOne(Orders, { id: orderId })
    await conn.close()
    return order
  }

  async delete(orderId: number) {
    const conn = await createConnection()
    await conn.manager.delete(Orders, { id: orderId })
    await conn.close()
  }

  async getOrderWithCustomer(orderId: number) {
    const conn = await createConnection()
    const orderWithCustomer = await conn.manager.findOne(
      Orders,
      { id: orderId },
      { relations: ["customer"] }
    )

    await conn.close()
    return orderWithCustomer
  }

  async getOrderWithProduct(productId: number) {
    const conn = await createConnection()
    const orderWithProduct = await conn.manager.findOne(
      Orders,
      { id: productId },
      { relations: ["product"] }
    )
    await conn.close()
    return orderWithProduct
  }
}

export default new OrderServices()
