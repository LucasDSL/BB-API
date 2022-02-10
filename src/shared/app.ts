import cors from "cors"
import { Application, json } from "express"
import CustomerRouter from "../modules/Customer/Customer.routes"
import ProductsRouter from "../modules/Product/Product.routes"
import OrdersRouter from "../modules/Order/Orders.routes"
import errorHandler from "./middlewares/errorHandler"

export default (app: Application): void => {
  app.use(cors())
  app.use(json())
  app.use(CustomerRouter)
  app.use(ProductsRouter)
  app.use(OrdersRouter)
  app.use(errorHandler)
}
