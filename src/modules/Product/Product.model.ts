import CampoObrigatorio from "../../shared/errors/CampoObrigatorio"
import ProdutoNaoEncotrado from "../../shared/errors/ProdutoNaoEncontrado"
import ProductServices from "./Product.services"

class ProductModel {
  name: string
  author: string
  price: number
  onStock: number

  constructor(newProduct) {
    this.name = newProduct.name
    this.name = newProduct.author
    this.price = newProduct.price
    this.onStock = newProduct.onStock

    this.validate()
  }
  async createProductOnDB() {
    return await ProductServices.addProduct(this)
  }

  validate() {
    const fieldsAddProduct = ["name", "author", "price", "onStock"]
    fieldsAddProduct.forEach((field) => {
      if (!this[field]) {
        throw new CampoObrigatorio()
      }
    })
  }

  static async getAllProducts() {
    const allProducts = await ProductServices.getAllProducts()
    if (allProducts.length === 0) {
      throw new ProdutoNaoEncotrado()
    }
    return allProducts
  }
}

export default ProductModel
