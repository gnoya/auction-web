import AppLogger from '@/utils/logger'
import { Server, Socket } from 'socket.io'

const logger = new AppLogger()

class SocketIOSingleton {
  private static instance: Server | null = null

  constructor(io: Server) {
    SocketIOSingleton.instance = io

    SocketIOSingleton.instance.on('connection', (socket: Socket) => {
      logger.info(`Client connected: ${socket.id}`)

      socket.on('disconnect', () => {
        logger.info(`Client disconnected: ${socket.id}`)
      })
    })
  }

  static getInstance(): Server {
    if (!SocketIOSingleton.instance)
      throw new Error('SocketIO instance not initialized')

    return SocketIOSingleton.instance
  }
}

export default SocketIOSingleton
