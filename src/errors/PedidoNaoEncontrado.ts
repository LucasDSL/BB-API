export default class PedidoNaoEncontrado extends Error {
  id: number
  name: string
  constructor(id: number) {
    super(`Pedido de id ${id} não encontrado!`)
    this.id = 6
    this.name = "PedidoNaoEncontrado"
  }
}
