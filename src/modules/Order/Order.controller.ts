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
      const conn = await createConnection()
      const isThereOrder = await conn.manager.findOne(Orders, {
        id: Number(orderId),
      })
      if (!isThereOrder) {
        await conn.close()
        throw new PedidoNaoEncontrado(Number(orderId))
      }

      await conn.manager.delete(Orders, { id: Number(orderId) })
      await conn.close()
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
      const conn = await createConnection()
      const order = await conn.manager.findOne(
        Orders,
        {
          id: Number(orderId),
        },
        { relations: ["product"] }
      )
      await conn.close()
      if (!order) {
        throw new PedidoNaoEncontrado(Number(orderId))
      }

      res.status(200).json(order.product)
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
      const conn = await createConnection()
      const order = await conn.manager.findOne(
        Orders,
        {
          id: Number(orderId),
        },
        { relations: ["customer"] }
      )
      await conn.close()
      if (!order) {
        throw new PedidoNaoEncontrado(Number(orderId))
      }

      res.status(200).json(order.customer)
    } catch (error) {
      next(error)
    }
  }
}

export default new OrdersController()
