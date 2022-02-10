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

  async productByName(name: string) {
    const conn = await createConnection()
    const product = await conn.manager.findOne(Products, { name: name })
    await conn.close()
    return product
  }

  async increaseProductStock(Product: Products, newQuantity: number) {
    const conn = await createConnection()
    const resultOperation = await conn.manager.update(
      Products,
      { id: Product.id },
      {
        onStock: newQuantity,
      }
    )
    await conn.close()
    return resultOperation
  }
}

export default new ProductService()
