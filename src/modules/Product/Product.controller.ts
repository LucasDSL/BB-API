import express from "express"
import { createConnection } from "typeorm"
import { Products } from "../../entity/Product.entity"
import newProduct from "./NewProduct"
import CampoObrigatorio from "../../shared/errors/CampoObrigatorio"
import ProdutoNaoEncotrado from "../../shared/errors/ProdutoNaoEncontrado"
import Product from "./Product.model"

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
        throw new ProdutoNaoEncotrado()
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
    const productFromClient: newProduct = req.body
    try {
      const product = new Product(productFromClient)
      const productOnDb = product.createProductOnDB()
      return res.status(200).json({ Status: "Success", Product: productOnDb })
    } catch (error) {
      next(error)
    }
  }
}

export default new ProductsController()
