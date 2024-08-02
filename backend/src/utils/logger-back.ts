import { NODE_ENV } from '@/config/env'
import winston, { format } from 'winston'

// Define your severity levels.
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
}

const level = () => {
  return NODE_ENV === 'development' ? 'debug' : 'http'
}

winston.addColors({
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white',
})

// Chose the aspect of your log customizing the log format.
// const format = winston.format.combine(
//   // Add the message timestamp with the preferred format
//   winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
//   // Tell Winston that the logs must be colored
//   winston.format.colorize({ all: true }),
//   // Define the format of the message showing the timestamp, the level and the message
//   winston.format.printf(
//     (info) => `${info.timestamp} ${info.level}: ${info.message}`
//   )
// )

const alignColorsAndTime = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss',
  }),
  winston.format.printf(
    (info) => `[${info.timestamp}] ${info.level}: ${info.message}`
  )
)

// Define which transports the logger must use to print out messages.
// In this example, we are using three different transports
const transports = [
  // Allow the use the console to print the messages
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      alignColorsAndTime
    ),
  }),
  // Allow to print all the error level messages inside the error.log file
  new winston.transports.File({
    filename: 'logs/error.log',
    level: 'error',
  }),
  // Allow to print all the error message inside the all.log file
  // (also the error log that are also printed inside the error.log(
  // new winston.transports.File({ filename: 'logs/all.log' }),
]

// Create the logger instance that has to be exported
// and used to log messages.
const logger = winston.createLogger({
  level: level(),
  levels,
  format: format.combine(
    format((info) => {
      info.level = info.level.toUpperCase()
      return info
    })()
  ),
  transports,
})

export default logger
