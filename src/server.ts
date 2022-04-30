import path from "path";
import { createExpressServer, RoutingControllersOptions } from "routing-controllers";
import { Server } from "http";

const controllersPath = path.resolve(__dirname, 'api', 'routes', '**', 'controller.ts')

const middlewaresPath = path.resolve(__dirname, 'api', 'middlewares', '**', '*.ts')

const options:RoutingControllersOptions = {
    cors: '*',
    defaultErrorHandler: false,
    controllers: [controllersPath],
    middlewares: [middlewaresPath]
}

const app: Server = createExpressServer({
    cors: '*',
    defaultErrorHandler: false,
    controllers: [controllersPath],
    middlewares: [middlewaresPath]
  })

export const server = async() =>{
    return app
}