import { CampoObrigatorio } from "../errors/listErrors"
export default (err, req, res, next) => {
  let status = 500
  if (err instanceof CampoObrigatorio) {
    status = 404
  }
  res.status(status).json({
    id: err.id,
    errorName: err.name,
    errorMessage: err.message,
  })
}
