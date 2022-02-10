import { Customers } from "../../entity/Customer.entity"
import { Products } from "../../entity/Product.entity"
import Product from "../Product/Product.model"
import Customer from "../Customer/Customer.model"
import ProdutoNaoEncotrado from "../../shared/errors/ProdutoNaoEncontrado"
import ClienteNaoEncontrado from "../../shared/errors/CllienteNaoEncontrado"
import QuantidadeInsuficiente from "../../shared/errors/QuantidadeInsuficiente"
import OrderServices from "./Order.services"
class Order {
  productId: number
  customerId: number
  quantity: number
  constructor(newOrder) {
    this.productId = newOrder.productId
    this.customerId = newOrder.customerId
    this.quantity = newOrder.quantity
  }

  async validateCustomerAndProduct(): Promise<[Customers, Products]> {
    const product = await Product.searchProductById(this.productId)
    if (!product) {
      throw new ProdutoNaoEncotrado(this.productId)
    }
    const customer = await Customer.searchCustomerById(this.customerId)
    if (!customer) {
      throw new ClienteNaoEncontrado()
    }
    return [customer, product]
  }

  async productQuantityEnough(product: Products) {
    if (product.onStock < this.quantity) {
      throw new QuantidadeInsuficiente()
    }
    return true
  }

  async addOrderOnDB() {
    const [customer, product] = await this.validateCustomerAndProduct()

    const newQuantity = product.onStock - this.quantity
    if (this.productQuantityEnough) {
      await Product.decreaseQuantity(product, newQuantity)
    }

    const newOrder = { productId: product.id, customerId: customer.id }
    await OrderServices.addOrderOnDB(newOrder)
  }
}

export default Order
