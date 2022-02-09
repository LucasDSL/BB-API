import { Router } from "express"
import { CustomerController } from "../../controllers/listControllers"

const router = Router()
router.post("/customer", CustomerController.createCustomer)
router.patch("/customer/:customerId", CustomerController.updateCustomer)
router.delete("/customer", CustomerController.deleteCustomer)
router.post("/customer/login", CustomerController.login)
export default router
