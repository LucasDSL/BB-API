import { Router } from "express"
import OrderController from "./Order.controller"

const router = Router()
router.post("/orders", OrderController.addOrder)
router.delete("/orders/:orderId", OrderController.deleteOrder)
router.get("/orders/:orderId/product", OrderController.getProduct)
router.get("/orders/:orderId/customer", OrderController.getCustomer)
export default router
