import { CampoObrigatorio, ClienteNaoEncontrado } from "../errors/listErrors"
export default (err, req, res, next) => {
  let status = 500
  if (err instanceof CampoObrigatorio || err instanceof ClienteNaoEncontrado) {
    status = 404
  }
  res.status(status).json({
    id: err.id,
    errorName: err.name,
    errorMessage: err.message,
  })
}
