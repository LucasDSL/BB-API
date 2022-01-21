export default class CampoInvalido extends Error {
  id: number
  name: string
  constructor(campo: string = "") {
    let message
    if (campo == "") {
      message = `A requisição deve conter um corpo adequado.`
    } else {
      message = `O campo '${campo}' é inválido.`
    }
    super(message)
    this.id = 3
    this.name = "CampoInvalido"
  }
}
