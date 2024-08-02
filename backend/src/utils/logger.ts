import { NODE_ENV } from '@/config/env'
import winston, { format } from 'winston'

// ------------- Define log levels and colors
const levels = {
  error: 0,
  warn: 1,
  http: 2,
  info: 3,
  debug: 4,
}

winston.addColors({
  ERROR: 'red',
  WARN: 'yellow',
  INFO: 'green',
  HTTP: 'magenta',
  DEBUG: 'white',
})

// ------------- Create formatters for logger
const timestampFormat = winston.format.timestamp({
  format: 'YYYY-MM-DD HH:mm:ss',
})

const levelToUpperCaseFormat = format((info) => {
  info.level = info.level.toUpperCase()
  return info
})()

const alignColorsAndTimeFormat = winston.format.printf((data) =>
  winston.format
    .colorize()
    .colorize(
      data.level,
      `[${data.timestamp}] ${data.level}: ${typeof data.message === 'object' ? JSON.stringify(data.message, null, 2) : data.message}`
    )
)

// ------------- Create transports for logger
const transports = [
  new winston.transports.Console({
    format: alignColorsAndTimeFormat,
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'http',
    format: winston.format.printf(
      (data) =>
        `[${data.timestamp}] ${data.level}: ${typeof data.message === 'object' ? JSON.stringify(data.message, null, 2) : data.message}`
    ),
  }),
]

// Create the logger instance
const logger = winston.createLogger({
  level: (() => (NODE_ENV === 'development' ? 'debug' : 'http'))(),
  levels,
  transports,
  format: winston.format.combine(timestampFormat, levelToUpperCaseFormat),
})

export default logger
