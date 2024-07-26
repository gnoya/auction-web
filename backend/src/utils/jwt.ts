import { Request } from 'express'
import jwt from 'jsonwebtoken'
import { JWTPayload } from '@/types/jwt-payload.type'
import { BadJWTError, MissingJWTError } from '@/errors/common'

export function signJWT(
  payload: JWTPayload,
  secret: string,
  expiresIn: string
) {
  return jwt.sign(payload, secret, { expiresIn })
}

export function extractJWT(req: Request): string {
  const bearerToken = req.get('Authorization')
  if (!bearerToken) throw new MissingJWTError()

  const token = bearerToken.split('Bearer ')[1]
  if (!token) throw new BadJWTError(token)

  return token
}

export function decodeJWT(token: string): JWTPayload {
  const decoded = jwt.decode(token)
  if (!decoded) throw new BadJWTError(token)

  return decoded as JWTPayload
}

export function verifyJWT(token: string, secret: string) {
  try {
    jwt.verify(token, secret)
    return true
  } catch (err) {
    return false
  }
}

export function jwtToUserId(token: string): number {
  const decoded = decodeJWT(token)
  if (!decoded) throw new BadJWTError(token)

  return decoded.userId as number
}

export function reqToUserId(req: Request): number {
  const token = extractJWT(req)
  if (!token) throw new MissingJWTError()

  const userId = jwtToUserId(token)
  if (!userId) throw new BadJWTError(token)

  return userId
}

export function reqToJWTPayload(req: Request): JWTPayload {
  const token = extractJWT(req)
  if (!token) throw new MissingJWTError()

  return decodeJWT(token)
}
