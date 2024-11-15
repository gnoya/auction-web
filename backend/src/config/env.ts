import dotenv from 'dotenv'
import path from 'path'

export const NODE_ENV = process.env.NODE_ENV?.trim() || 'development'

const envPath = path.resolve(
  __dirname,
  NODE_ENV === 'test' ? './../../.env.test' : './../../.env'
)
dotenv.config({
  path: envPath,
})

export const DATABASE_URL = process.env.DATABASE_URL || ''
export const SERVICE_NAME = process.env.SERVICE_NAME || ''
export const SERVICE_PORT = process.env.SERVICE_PORT || ''
