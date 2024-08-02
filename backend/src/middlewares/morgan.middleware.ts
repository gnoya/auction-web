import { reqToUserId } from '@/utils/jwt'
import logger from '@/utils/logger'
import { Request } from 'express'
import { ServerResponse } from 'http'
import morgan, { StreamOptions, TokenIndexer } from 'morgan'

const stream = (trim: boolean = false): StreamOptions => {
  return {
    write: (message: string) => logger.http(trim ? message.trim() : message),
  }
}

// Build the body message to be logged.
morgan.token('body', (req) => {
  return JSON.stringify((req as Request).body)
})

const customBeforeMorganFormat = (
  tokens: TokenIndexer<Request, ServerResponse>,
  req: Request,
  res: ServerResponse
) => {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const body = tokens.body(req, res)
  const ipAddress = req.ip && req.ip !== '::1' ? req.ip : '-'

  let userId: number | string
  try {
    userId = reqToUserId(req)
  } catch (err) {
    userId = '-'
  }

  return `${method} ${url} | Body: ${body} | userId: ${userId} | IP: ${ipAddress}`
}

const customAfterMorganFormat = (
  tokens: TokenIndexer<Request, ServerResponse>,
  req: Request,
  res: ServerResponse
) => {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = Math.round(Number(tokens['response-time'](req, res)))

  return `${method} ${url} | Status: ${status} - Time: ${responseTime} ms`
}

// ----------------- Morgan Middleware, occurs before the request
export const morganBeforeMiddleware = morgan(customBeforeMorganFormat, {
  stream: stream(true),
  immediate: true,
})

// ----------------- Morgan Middleware, occurs after the request
export const morganAfterMiddleware = morgan(customAfterMorganFormat, {
  stream: stream(false),
})
