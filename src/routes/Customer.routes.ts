import { Router } from "express"
import { CustomerController } from "../controllers/listControllers"

const router = Router()
router.post("/customer", CustomerController.createCustomer)
router.patch("/customer", CustomerController.updateCustomer)
router.delete("/customer", CustomerController.deleteCustomer)
export default router
