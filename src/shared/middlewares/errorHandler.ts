import CampoInvalido from "../errors/CampoInvalido"
import CampoObrigatorio from "../errors/CampoObrigatorio"
import ClienteNaoEncontrado from "../errors/CllienteNaoEncontrado"
import DadosIncorretos from "../errors/DadosIncorretos"
import PedidoNaoEncontrado from "../errors/PedidoNaoEncontrado"
import ProdutoNaoEncotrado from "../errors/ProdutoNaoEncontrado"
import QuantidadeInsuficiente from "../errors/QuantidadeInsuficiente"

export default (err, req, res, next) => {
  let status = 500
  if (err instanceof CampoObrigatorio || err instanceof CampoInvalido) {
    status = 400
  }
  if (
    err instanceof ProdutoNaoEncotrado ||
    err instanceof ClienteNaoEncontrado ||
    err instanceof PedidoNaoEncontrado ||
    err instanceof QuantidadeInsuficiente
  ) {
    status = 404
  }
  if (err instanceof DadosIncorretos) {
    status = 401
  }
  res.status(status).json({
    id: err.id,
    errorName: err.name,
    errorMessage: err.message,
  })
}
