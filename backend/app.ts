import express, { Request, Response, json } from 'express'
import cors from 'cors'
import { NODE_ENV, SERVICE_PORT } from '@/config/env'
import authRoutes from '@/routes/auth.routes'
import auctionRoutes from '@/routes/auction.routes'
import Broadcaster from '@/broadcaster/broadcaster'
import { Server } from 'socket.io'
import { createServer } from 'http'
import SocketManager from '@/broadcaster/socket-manager'
import logger from '@/utils/logger'
import morganMiddleware from '@/middlewares/morgan.middleware'

//----------------- express
const app = express()
const server = createServer(app)

//------------- parsing body
app.use(json())

//------------- cors
app.use(cors())

//------------- logging middleware
app.use(morganMiddleware)

//------------- healthcheck
app.get('/health-check', (req: Request, res: Response) => res.json('ok'))

//------------- routes
app.use('/api/auth', authRoutes)
app.use('/api/auctions', auctionRoutes)

//------------- socket io
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
new SocketManager(io, new Broadcaster()).setup()

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
