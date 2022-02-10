import { createConnection } from "typeorm"
import { Customers } from "../../entity/Customer.entity"
import Customer from "./Customer.model"

class CustomerService {
  async createCustomer(newCustomer: Customer): Promise<Customers> {
    const conn = await createConnection()
    const customerOnDb = await conn.manager.save(Customers, newCustomer)
    await conn.close()
    return customerOnDb
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

  async searchCustomerById(customerId: number, next: Function) {
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

  async searchCustomerByEmail(customerEmail: string) {
    const conn = await createConnection()
    const customerDb = await conn.manager.findOne(Customers, {
      email: customerEmail,
    })
    await conn.close()
    return customerDb
  }

  async deleteCustomer(customer: Customers) {
    const conn = await createConnection()
    await conn.manager.remove(customer)
    await conn.close()
  }
}

export default new CustomerService()
