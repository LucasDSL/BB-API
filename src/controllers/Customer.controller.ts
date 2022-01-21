import express from "express"
import newCustomer from "../interfaces/NewCustomer"
import encryptPassword from "../middlewares/encryptPassword"
import { createConnection } from "typeorm"
import { Customers } from "../entity/Customer.entity"
import Errors from "../errors/listErrors"
import CampoInvalido from "../errors/CampoInvalido"
import CampoObrigatorio from "../errors/CampoObrigatorio"

class CustomerController {
  async createCustomer (
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
          throw new Errors.CampoObrigatorio()
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

  async updateCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const fieldsUpdate: string[] = [
      "name",
      "email",
      "cellphone",
      "password",
      "customerAddress",
    ]

    try {
      const { customerId } = req.params
      const updates = req.body
      console.log(updates)
      if (!updates) {
        throw new CampoInvalido()
      }
      const control = new CustomerController()
      control.isThereCostumer(Number(customerId), next)
      const newPatch = Object.keys(updates)
      newPatch.forEach((key) => {
        if (fieldsUpdate.indexOf(key) === -1) {
          throw new CampoInvalido(key)
        }
      })

      const conn = await createConnection()
      const update = await conn.manager.update(
        Customers,
        { id: customerId },
        updates
      )
      conn.close()
      return res.status(202).json(update)
    } catch (error) {
      next(error)
    }
  }

  async deleteCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    try {
      const { customerId } = req.params
      const control = new CustomerController()
      control.isThereCostumer(Number(customerId), next)
      const conn = await createConnection()
      await conn.manager.delete(Customers, {
        id: customerId,
      })
      await conn.close()
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  async isThereCostumer(id: number, next: Function) {
    try {
      const conn = await createConnection()
      const isThereCostumer = await conn.manager.findOne(Customers, {
        id: Number(id),
      })
      conn.close()
      if (isThereCostumer) {
        return
      }
      throw new Errors.ClienteNaoEncontrado(id)
    } catch (error) {
      next(error)
    }
  }
}

export default new CustomerController()
