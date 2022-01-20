import express from "express"
import newCustomer from "../interfaces/NewCustomer"
import encryptPassword from "../middlewares/encryptPassword"
import { Connection, createConnection } from "typeorm"
import { Customers } from "../entity/Customer.entity"

class CustomerController {
  fieldsNewCustomer: string[] = ["customerAddress"]
  static async createCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const customerFromClient: newCustomer = req.body
    try {
      customerFromClient.password = await encryptPassword(
        customerFromClient.password,
        next
      )

      const conn = await createConnection()
      let newCustomer = new Customers()
      Object.keys(customerFromClient).forEach((key) => {
        newCustomer[key] = customerFromClient[key]
      })

      const customerOnDb = await conn.manager.save(newCustomer)
      res
        .status(201)
        .json({
          Message: "Cliente criado com sucesso",
          customerId: customerOnDb.id,
        })
    } catch (error) {
      next(error)
    }
  }

  static async updateCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {}

  static async deleteCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {}
}

export default CustomerController
