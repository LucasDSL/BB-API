import { Router } from "express"
import { ProductsController } from "../../controllers/listControllers"
const router = Router()
router.get("/products", ProductsController.allProducts)
router.post("/products", ProductsController.addProduct)
export default router 
