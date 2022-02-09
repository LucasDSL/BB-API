import express from "express"
import newCustomer from "./NewCustomer"
import CampoInvalido from "../../shared/errors/CampoInvalido"
import Customer from "./Customer.model"

class CustomerController {
  async createCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const customerFromClient: newCustomer = req.body
    const { password } = req.body
    try {
      const creatingCustomer = new Customer(customerFromClient)

      await creatingCustomer.addPassword(password)
      const customerOnDb = await creatingCustomer.addOnDatabase(next)

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
    try {
      const { customerId } = req.params
      const updateCustomer = req.body
      if (!updateCustomer) {
        throw new CampoInvalido()
      }
      const updatingCustomer = new Customer(updateCustomer)
      await updatingCustomer.updateCustomer(Number(customerId), next)

      return res
        .status(202)
        .json({ Status: "Success", Message: "Customer Updated" })
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
      await Customer.deleteCustomer(
        Number(customerId),
        next
      )
      return res.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}

export default new CustomerController()
