export class ClienteNaoEncontrado extends Error {
  id: number
  name: string
  constructor(id: number) {
    super(`Cliente com id ${id} não encontrado!`)
    this.id = 2
    this.name = "ClienteNaoEncontrado"
  }
}
