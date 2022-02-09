import CampoInvalido from "../shared/errors/CampoInvalido"
import CampoObrigatorio from "../shared/errors/CampoObrigatorio"
import ClienteNaoEncontrado from "../shared/errors/CllienteNaoEncontrado"
import DadosIncorretos from "../shared/errors/DadosIncorretos"
import PedidoNaoEncontrado from "../shared/errors/PedidoNaoEncontrado"
import ProdutoNaoEncotrado from "../shared/errors/ProdutoNaoEncontrado"
import QuantidadeInsuficiente from "../shared/errors/QuantidadeInsuficiente"

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
