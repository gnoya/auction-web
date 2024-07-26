import { Request, Response } from 'express'
import AppLogger from './logger'

const logger = new AppLogger()

export const routeHandler =
  <T extends { status: number; data?: unknown }>(
    routerHandler: (req: Request, res: Response) => Promise<T>
  ) =>
  async (req: Request, res: Response) => {
    try {
      const { status, data, ...rest } = await routerHandler(req, res)
      if (!res.headersSent) res.status(status).json({ data, ...rest })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      logger.error(error)
      const internalError = error.hasOwnProperty('status') // eslint-disable-line
        ? (error as { status: number })
        : {
            status: 500,
            message: 'An unexpected exception has occurred.',
            meta: { route: req.originalUrl, error },
          }

      if (!res.headersSent)
        res.status(internalError.status).json({ error: internalError })
    }
  }
