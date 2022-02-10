import { createConnection } from "typeorm"
import Product from "./Product.model"
import { Products } from "../../entity/Product.entity"
class ProductService {
  async addProduct(newProduct: Product): Promise<Products> {
    const conn = await createConnection()
    const productCreated = await conn.manager.save(Products, newProduct)
    await conn.close()
    return productCreated
  }

  async getAllProducts(): Promise<Products[]> {
    const conn = await createConnection()
    const products = await conn.manager.find(Products)
    await conn.close()
    return products
  }
}

export default new ProductService()
