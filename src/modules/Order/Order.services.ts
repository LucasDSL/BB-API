import { createConnection } from "typeorm"
import { Orders } from "../../entity/Order.entity"
class OrderServices {
  async addOrderOnDB(order) {
    const conn = await createConnection()
    const orderCreated = await conn.manager.save(Orders, order)
    await conn.close()
    return orderCreated
  }
}

export default new OrderServices()
