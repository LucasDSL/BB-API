export default class QuantidadeInsuficiente extends Error {
  id: number
  name: string
  constructor() {
    super("Quantidade do produto insuficiente em estoque")
    this.id = 5
    this.name = "QuantidadeInsuficiente"
  }
}
