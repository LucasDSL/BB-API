import cors from "cors"
import { Application, json } from "express"

export default (app: Application): void => {
    app.use(cors())
    app.use(json())
}