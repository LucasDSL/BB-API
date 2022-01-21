export default class ProdutoNaoEncotrado extends Error {
    id:number 
    name: string 
  constructor(id: number = -1) {
    let message = "Produtos nao encontrados"
    if (id !== -1) {
      message = `Produto com id ${id} não encontrado!`
    }
    super(message)
    this.id = 4
    this.name = "ProdutoNaoEncontrado"
  }
}
