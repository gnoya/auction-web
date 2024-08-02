import logger from '@/utils/logger'
import { Server as SocketIOServer } from 'socket.io'

export default class Broadcaster {
  private static io?: SocketIOServer
  private static defaultChannel: string = 'notifications'

  setIO = (io: SocketIOServer) => {
    Broadcaster.io = io

    Broadcaster.io.on('connection', (socket) => {
      logger.info(`Socket ${socket.id} has connected to server`)

      socket.join(Broadcaster.defaultChannel)

      socket.on('disconnect', () => {
        logger.info(`Socket ${socket.id} has disconnected from server`)
      })
    })
  }

  broadcast = ({
    channel = Broadcaster.defaultChannel,
    event,
    data,
  }: {
    channel?: string
    event: string
    data: unknown
  }) => {
    if (!Broadcaster.io) throw new Error('SocketIO server is not set')

    Broadcaster.io.to(channel).emit(event, data)

    logger.info({
      channel,
      event,
      data,
    })
  }
}
