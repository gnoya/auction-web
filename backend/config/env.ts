import dotenv from 'dotenv'

export const NODE_ENV = process.env.NODE_ENV?.trim() || 'development'
const envPath =
  __dirname + (NODE_ENV === 'test' ? './../.env.test' : './../.env')
dotenv.config({
  path: envPath,
})

export const DB_URL = process.env.DB_URL || ''

export const SERVICE_NAME = process.env.SERVICE_NAME || ''
export const SERVICE_PORT = process.env.SERVICE_PORT || ''
