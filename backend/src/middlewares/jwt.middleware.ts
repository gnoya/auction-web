import Error, { InvalidJWTError } from '@/errors/common'
import UserService from '@/services/user.service'
import { extractJWT, jwtToUserId, verifyJWT } from '@/utils/jwt'
import { User } from '@prisma/client'
import { NextFunction, Request, Response } from 'express'

export default async function JWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userService = new UserService()
    const token = extractJWT(req)
    const userId = jwtToUserId(token)

    const user = (await userService.getUser(userId, false).catch(() => {
      throw new InvalidJWTError(token)
    })) as User

    if (verifyJWT(token, user.jwtSecret || '')) {
      next()
      return
    }

    throw new InvalidJWTError(token)
  } catch (error: unknown) {
    const typedError = error as Error
    res.status(typedError.status).json({ error: typedError })
  }
}
