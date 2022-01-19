import cors from "cors"
import { Application, json } from "express"
import CustomerRouter from "./Customer.routes"

export default (app: Application): void => {
  app.use(cors())
  app.use(json())
  app.use(CustomerRouter)
}
