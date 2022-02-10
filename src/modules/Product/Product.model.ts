import CampoObrigatorio from "../../shared/errors/CampoObrigatorio"
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

    this.valida()
  }
  async createProductOnDB() {
    return await ProductServices.addProduct(this)
  }

  valida() {
    const fieldsAddProduct = ["name", "author", "price", "onStock"]
    fieldsAddProduct.forEach((field) => {
      if (!this[field]) {
        throw new CampoObrigatorio()
      }
    })
  }
}

export default ProductModel
