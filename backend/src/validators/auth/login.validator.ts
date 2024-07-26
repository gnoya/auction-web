import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { getLoginZodSchema } from 'src/schemas/auth.schema'

export async function loginValidator(req: Request) {
  const loginSchema = getLoginZodSchema()
  const schema = z.promise(z.object(loginSchema))

  const fields = {
    ...R.pick(Object.keys(loginSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
