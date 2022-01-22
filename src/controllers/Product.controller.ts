import express from "express"
import { createConnection } from "typeorm"
import { Products } from "../entity/Product.entity"
import Errors from "../errors/listErrors"
import newProduct from "../interfaces/NewProduct"

class ProductsController {
  async allProducts(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    try {
      const conn = await createConnection()
      const allProducts = await conn.manager.find(Products)
      if (allProducts.length === 0) {
        await conn.close()
        throw new Errors.ProdutoNaoEncotrado()
      }
      await conn.close()
      return res.status(200).json(allProducts)
    } catch (error) {
      next(error)
    }
  }

  async addProduct(
    req: express.Request,
    res: express.Response,
    next: Function
  ) {
    const productFromCliente: newProduct = req.body
    try {
      const fieldsAddProduct = ["name", "author", "price", "onStock"]
      fieldsAddProduct.forEach((field) => {
        if (!productFromCliente[field]) {
          throw new Errors.CampoObrigatorio()
        }
      })

      const conn = await createConnection()
      const addedProduct = await conn.manager.insert(Products, productFromCliente)
      await conn.close()
      return res.status(200).end()
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductsController()
