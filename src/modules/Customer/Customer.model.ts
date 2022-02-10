import bcrypt from "bcrypt"
import ClienteNaoEncontrado from "../../shared/errors/CllienteNaoEncontrado"
import CustomerServices from "./Customer.services"
import jwt from "jsonwebtoken"
import DadosIncorretos from "../../shared/errors/DadosIncorretos"
import CampoObrigatorio from "../../shared/errors/CampoObrigatorio"
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

  async addOnDatabase() {
    return await CustomerServices.createCustomer(this)
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
        throw new CampoObrigatorio()
      }
    })
  }

  static async searchCustomerById(customerId: number) {
    return await CustomerServices.searchCustomerById(customerId)
  }

  static async searchCustomerByEmail(customerEmail: string) {
    return CustomerServices.searchCustomerByEmail(customerEmail)
  }

  static async deleteCustomer(customerData) {
    const isThereCustomer = await Customer.searchCustomerByEmail(
      customerData.email
    )
    if (!isThereCustomer) {
      throw new ClienteNaoEncontrado()
    }
    await CustomerServices.deleteCustomer(isThereCustomer)
  }

  async addPassword(password: string) {
    if (!password) {
      throw new CampoObrigatorio()
    }
    this.password = await Customer.generatePassword(password)
  }

  static generatePassword(password: string) {
    const cost = 12
    return bcrypt.hash(password, cost)
  }

  static async login(reqBody) {
    const customer = await Customer.searchCustomerByEmail(reqBody.email)
    if (!customer) {
      throw new DadosIncorretos()
    }
    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      customer.password
    )
    if (isPasswordCorrect) {
      const token = jwt.sign(reqBody, process.env.SECRET_KEY)
      return token
    }
    throw new DadosIncorretos()
  }

  static async verifyTokenAndReturnPayload(token: string) {
    const payload = jwt.verify(token, process.env.SECRET_KEY)
    return payload
  }
}

export default Customer
