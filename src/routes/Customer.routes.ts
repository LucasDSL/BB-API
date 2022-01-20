import { Router } from "express"
import { CustomerController } from "../controllers/listControllers"

const router = Router()
router.post("/customer", CustomerController.createCustomer)
router.patch("/customer/:customerId", CustomerController.updateCustomer)
router.delete("/customer/:customerId", CustomerController.deleteCustomer)
export default router
