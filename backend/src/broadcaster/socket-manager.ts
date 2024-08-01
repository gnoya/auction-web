import { Server as SocketIOServer } from 'socket.io'
import Broadcaster from './broadcaster'
import AppLogger from '@/utils/logger'

const logger = new AppLogger()

export default class SocketManager {
  protected broadcaster: Broadcaster
  protected io: SocketIOServer

  constructor(io: SocketIOServer, broadcaster: Broadcaster) {
    this.broadcaster = broadcaster
    this.io = io

    this.broadcaster.setIO(io)
  }

  setup() {
    this.io.on('connection', (socket) => {
      logger.info(`Socket ${socket.id} has connected to server`)

      socket.join(this.broadcaster.defaultChannel)

      socket.on('disconnect', () => {
        logger.info(`Socket ${socket.id} has disconnected from server`)
      })
    })
  }
}
