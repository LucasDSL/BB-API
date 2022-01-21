import express from "express"
import newCustomer from "../interfaces/NewCustomer"
import encryptPassword from "../middlewares/encryptPassword"
import { createConnection } from "typeorm"
import { Customers } from "../entity/Customer.entity"
import { CampoObrigatorio, ClienteNaoEncontrado } from "../errors/listErrors"

class CustomerController {
  static async createCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const customerFromClient: newCustomer = req.body
    const fieldsNewCustomer: string[] = [
      "name",
      "email",
      "cellphone",
      "password",
      "customerAddress",
    ]
    try {
      fieldsNewCustomer.forEach((field) => {
        if (!customerFromClient[field]) {
          throw new CampoObrigatorio()
        }
      })
      
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
      await conn.close()
      return res.status(201).json({
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
  ) {
    try {
      const { customerId } = req.params
      const conn = await createConnection()
      const isThereCustomer = await conn.manager.findOne(
        Customers,
        Number(customerId)
      )
      if (!isThereCustomer) {
        await conn.close()
        throw new ClienteNaoEncontrado(Number(customerId))
      }

      await conn.manager.delete(Customers, {
        id: customerId,
      })
      await conn.close()
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}

export default CustomerController
