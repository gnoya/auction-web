import { NextFunction, Request, Response } from 'express'

export default async function JWTMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next()
}
