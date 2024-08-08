import { reqToUserId } from '@/utils/jwt'
import logger from '@/utils/logger'
import { Request, Response } from 'express'
import morgan, { StreamOptions, TokenIndexer } from 'morgan'

const stream = (trim: boolean = false): StreamOptions => {
  return {
    write: (message: string) => logger.http(trim ? message.trim() : message),
  }
}

const customBeforeMorganFormat = (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
) => {
  const requestId = Math.floor(10000 + Math.random() * 90000)
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const body = { ...(req as Request).body }
  const ipAddress = req.ip && req.ip !== '::1' ? req.ip : '-'

  let userId: number | string
  try {
    userId = reqToUserId(req)
  } catch (err) {
    userId = '-'
  }

  delete body.password
  res.locals.userId = userId
  res.locals.requestId = requestId

  return `${method} ${url} | Request: ${requestId} | User: ${userId} | IP: ${ipAddress} | Body: ${JSON.stringify(body)}`
}

const customAfterMorganFormat = (
  tokens: TokenIndexer<Request, Response>,
  req: Request,
  res: Response
) => {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = Math.round(Number(tokens['response-time'](req, res)))
  const reqId = res.locals.requestId

  return `${method} ${url} | Request: ${reqId} | Status: ${status} | Time: ${responseTime} ms`
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
