import AppLogger from '@/utils/logger'
import { Server as SocketIOServer } from 'socket.io'

const logger = new AppLogger()

export default class Broadcaster {
  private static io?: SocketIOServer
  public defaultChannel: string = 'notifications'

  setIO(io: SocketIOServer) {
    Broadcaster.io = io
  }

  broadcast({
    channel = this.defaultChannel,
    event,
    data,
  }: {
    channel?: string
    event: string
    data: unknown
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
