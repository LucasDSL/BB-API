import express from "express"
import { createConnection } from "typeorm"
import { Customers } from "../entity/Customer.entity"
import { Orders } from "../entity/Order.entity"
import { Products } from "../entity/Product.entity"
import Errors from "../errors/listErrors"
import QuantidadeInsuficiente from "../errors/QuantidadeInsuficiente"
import NewOrder from "../interfaces/NewOrder"

class OrdersController {
  async addOrder(req: express.Request, res: express.Response, next: Function) {
    const newOrder: NewOrder = req.body
    try {
      const conn = await createConnection()
      
      const isThereProduct = await conn.manager.findOne(Products, {
        id: newOrder.productId,
      })
      if (!isThereProduct) {
        await conn.close()
        throw new Errors.ProdutoNaoEncotrado(newOrder.productId)
      }

      const isThereCustomer = await conn.manager.findOne(Customers, {
        id: newOrder.customerId,
      })
      if (!isThereCustomer) {
        await conn.close()
        throw new Errors.ClienteNaoEncontrado(newOrder.customerId)
      }

      const newOrderQttLessEqualThanStock =
        newOrder.quantity <= isThereProduct.onStock ? true : false
      if (!newOrderQttLessEqualThanStock) {
        await conn.close()
        throw new QuantidadeInsuficiente()
      }

      const productIdUpdate = Number(newOrder.productId)
      const newQuantityUpdate =
        Number(isThereProduct.onStock) - Number(newOrder.quantity)
      await conn.manager.update(
        Products,
        { id: productIdUpdate },
        { onStock: newQuantityUpdate }
      )

      const insertOrder = new Orders()
      insertOrder.customer = isThereCustomer
      insertOrder.product = isThereProduct
      insertOrder.quantity = Number(newOrder.quantity)
      await conn.manager.save(Orders, insertOrder)
      await conn.close()

      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  }
}

export default new OrdersController()