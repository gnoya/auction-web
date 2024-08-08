import express, { Request, Response, json } from 'express'
import cors from 'cors'
import { NODE_ENV, SERVICE_PORT } from '@/config/env'
import authRoutes from '@/routes/auth.routes'
import auctionRoutes from '@/routes/auction.routes'
import Broadcaster from '@/broadcaster/broadcaster'
import { Server } from 'socket.io'
import { createServer } from 'http'
import logger from '@/utils/logger'
import {
  morganBeforeMiddleware,
  morganAfterMiddleware,
} from '@/middlewares/morgan.middleware'

//----------------- express
const app = express()
const server = createServer(app)

//------------- parsing body
app.use(json())
app.enable('trust proxy')

//------------- cors
app.use(cors())

//------------- logging middleware
app.use(morganBeforeMiddleware)
app.use(morganAfterMiddleware)

//------------- healthcheck
app.get('/api/health-check', (req: Request, res: Response) => res.json('ok'))

//------------- routes
app.use('/api', authRoutes)
app.use('/api', auctionRoutes)

//------------- socket io
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

new Broadcaster().setIO(io)

//------------- starting the app
function start() {
  server.listen(SERVICE_PORT, () => {
    logger.info(
      `Env is ${NODE_ENV}.`,
      `Service started in port ${SERVICE_PORT}`
    )
  })
}

if (NODE_ENV !== 'test') start()

export default app
