import express from "express"
import { createConnection } from "typeorm"
import { Orders } from "../../entity/Order.entity"
import PedidoNaoEncontrado from "../../shared/errors/PedidoNaoEncontrado"
import Order from "./Order.model"
import NewOrder from "./NewOrder"
class OrdersController {
  async addOrder(req: express.Request, res: express.Response, next: Function) {
    const newOrder: NewOrder = req.body
    try {
      const order = new Order(newOrder)
      await order.addOrderOnDB()
      return res.status(201).end()
    } catch (error) {
      next(error)
    }
  }

  async deleteOrder(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const { orderId } = req.params
    try {
      await Order.delete(Number(orderId))
      res.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  async getProduct(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const { orderId } = req.params
    try {
      const product = Order.getProduct(Number(orderId))
      res.status(200).json(product)
    } catch (error) {
      next(error)
    }
  }

  async getCustomer(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const { orderId } = req.params
    try {
      const customer = await Order.getCustomer(Number(orderId))
      res.status(200).json(customer)
    } catch (error) {
      next(error)
    }
  }
}

export default new OrdersController()
