import bcrypt from "bcrypt"
import Errors from "../../shared/errors/listErrors"
import CustomerServices from "./Customer.services"
class Customer {
  email: string
  password: string
  name: string
  customerAddress: string
  cpf: number
  cellphone: number

  constructor(newCustomer) {
    this.email = newCustomer.email
    this.name = newCustomer.name
    this.customerAddress = newCustomer.customerAddress
    this.cpf = newCustomer.cpf
    this.cellphone = newCustomer.cellphone
    this.password = newCustomer.password

    this.validate()
  }

  async updateCustomer(customerId: number, next: Function) {
    await this.addPassword(this.password)
    return await CustomerServices.updateCustomer(this, next, customerId)
  }

  async addOnDatabase(next: Function) {
    return await CustomerServices.createCustomer(this, next)
  }

  validate() {
    const fieldsNewCustomer: string[] = [
      "name",
      "email",
      "cellphone",
      "password",
      "customerAddress",
      "cpf",
    ]
    fieldsNewCustomer.forEach((field) => {
      console.log(this[field])
      if (!this[field]) {
        throw new Errors.CampoObrigatorio()
      }
    })
  }

  async addPassword(password: string) {
    if (!password) {
      throw new Errors.CampoObrigatorio()
    }
    this.password = await Customer.generatePassword(password)
  }

  static generatePassword(password: string) {
    const cost = 12
    return bcrypt.hash(password, cost)
  }
}

export default Customer
