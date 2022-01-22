import { Router } from "express"
import { OrderController } from "../controllers/listControllers"

const router = Router()
router.post("/orders", OrderController.addOrder)

export default router 