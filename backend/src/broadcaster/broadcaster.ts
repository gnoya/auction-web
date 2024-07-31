import AppLogger from '@/utils/logger'
import { Server as SocketIOServer } from 'socket.io'

const logger = new AppLogger()

export default class Broadcaster {
  private static io?: SocketIOServer

  setIO(io: SocketIOServer) {
    Broadcaster.io = io
  }

  broadcast({
    channel = 'notifications',
    event,
    data,
  }: {
    channel?: string
    event: string
    data: any // eslint-disable-line
  }) {
    if (!Broadcaster.io) throw new Error('SocketIO server is not set')

    Broadcaster.io.to(channel).emit(event, data)

    logger.info({
      channel,
      event,
      data,
    })
  }
}
