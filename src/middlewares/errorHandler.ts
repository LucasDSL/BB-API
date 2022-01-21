import Errors from "../errors/listErrors"
export default (err, req, res, next) => {
  let status = 500
  if (
    err instanceof Errors.CampoObrigatorio ||
    err instanceof Errors.ClienteNaoEncontrado ||
    err instanceof Errors.CampoInvalido
  ) {
    status = 404
  }
  res.status(status).json({
    id: err.id,
    errorName: err.name,
    errorMessage: err.message,
  })
}
