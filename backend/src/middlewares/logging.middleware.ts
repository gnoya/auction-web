import { NextFunction, Request, Response } from 'express'
import AppLogger from '@/utils/logger'
import { NODE_ENV } from '@/config/env'

const logger = new AppLogger()

export default function loggingMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  NODE_ENV !== 'test' &&
    logger.info(`Incoming ${req.method} request at route ${req.originalUrl}`)
  next()
}
