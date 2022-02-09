export default class DadosIncorretos extends Error {
  id: number
  name: string
  constructor() {
    super("Email ou senha incorretos!")
    this.id = 7
    this.name = "DadosIncorretos"
  }
}
