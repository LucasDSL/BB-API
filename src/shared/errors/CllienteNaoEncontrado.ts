export default class ClienteNaoEncontrado extends Error {
  id: number
  name: string
  constructor() {
    super(`Cliente não encontrado!`)
    this.id = 2
    this.name = "ClienteNaoEncontrado"
  }
}
