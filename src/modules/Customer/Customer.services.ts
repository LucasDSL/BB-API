import { createConnection } from "typeorm"
import { Customers } from "../../entity/Customer.entity"
import Customer from "./Customer.model"

class CustomerService {
  async createCustomer(newCustomer: Customer, next): Promise<Customers> {
    try {
      const conn = await createConnection()
      const customerOnDb = await conn.manager.save(Customers, newCustomer)
      await conn.close()
      return customerOnDb
    } catch (error) {
      next(error)
    }
  }

  async updateCustomer(updates: Customer, next: Function, id: number) {
    try {
      const conn = await createConnection()
      const customerOnDb = await conn.manager.update(
        Customers,
        { id: id },
        updates
      )
      await conn.close()
      return
    } catch (error) {
      next(error)
    }
  }

  async isThereCostumer(customerId: number, next: Function) {
    try {
      const conn = await createConnection()
      const customerOnDb = await conn.manager.findOne(Customers, {
        id: customerId,
      })
      await conn.close()
      if (customerOnDb) {
        return customerOnDb
      }
      return
    } catch (error) {
      next(error)
    }
  }

  async deleteCustomer(customer: Customers, next: Function) {
    try {
      const conn = await createConnection()
      await conn.manager.remove(customer)
      await conn.close()
    } catch (error) {
      next(error)
    }
  }
}

export default new CustomerService()
