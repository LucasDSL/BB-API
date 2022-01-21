export default class CampoObrigatorio extends Error {
  id: number
  name: string
  constructor() {
    super("Todos os campos devem estar preenchidos no corpo da requisição")
    this.id = 1
    this.name = "CampoObrigatorio"
  }
}
