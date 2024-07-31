import express, { Request, Response, json } from 'express'
import cors from 'cors'
import loggingMiddleware from '@/middlewares/logging.middleware'
import { appLoggerFactory } from '@/utils/logger'
import { NODE_ENV, SERVICE_NAME, SERVICE_PORT } from '@/config/env'
import authRoutes from '@/routes/auth.routes'
import auctionRoutes from '@/routes/auction.routes'
import Broadcaster from '@/broadcaster/broadcaster'
import { Server } from 'socket.io'
import { createServer } from 'http'
import SocketManager from '@/broadcaster/socket-manager'

const app = express()

//------------- socket io
const server = createServer(app)
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})
new SocketManager(io, new Broadcaster()).setup()

//------------- parsing body
app.use(json())

//------------- cors
app.use(cors())

//------------- logging middleware
app.use(loggingMiddleware)

//------------- healthcheck
app.get('/health-check', (req: Request, res: Response) => res.json('ok'))

//------------- routes
app.use('/api/auth', authRoutes)
app.use('/api/auctions', auctionRoutes)

//------------- starting the app
function start() {
  const logger = appLoggerFactory(
    `${SERVICE_NAME}:${SERVICE_PORT} - ${process.pid}`,
    NODE_ENV === 'production'
  )

  server.listen(SERVICE_PORT, () => {
    logger.info(
      `Env is ${NODE_ENV}.`,
      `Service started in port ${SERVICE_PORT}`
    )
  })
}

if (NODE_ENV !== 'test') start()

export default app