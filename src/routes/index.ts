import cors from "cors"
import { Application, json } from "express"
import CustomerRouter from "./Customer.routes"
import ProductsRouter from "./Product.routes"
import errorHandler from "../middlewares/errorHandler"

export default (app: Application): void => {
  app.use(cors())
  app.use(json())
  app.use(CustomerRouter)
  app.use(ProductsRouter)
  app.use(errorHandler)
}
