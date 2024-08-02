import logger from '@/utils/logger'
import { Request } from 'express'
import { ServerResponse } from 'http'
import morgan, { StreamOptions, TokenIndexer } from 'morgan'

const stream: StreamOptions = {
  write: (message: string) => logger.http(message),
}

const skip = () => {
  return false
}

// Build the body message to be logged.
morgan.token('body', (req) => {
  return JSON.stringify((req as Request).body)
})

const customMorganFormat = (
  tokens: TokenIndexer<Request, ServerResponse>,
  req: Request,
  res: ServerResponse
) => {
  const method = tokens.method(req, res)
  const url = tokens.url(req, res)
  const status = tokens.status(req, res)
  const responseTime = Math.round(Number(tokens['response-time'](req, res)))
  const body = tokens.body(req, res)

  return `${method} ${url} | Body: ${body} | Status: ${status} - Time: ${responseTime} ms`
}

const morganMiddleware = morgan(customMorganFormat, { stream, skip })

export default morganMiddleware
