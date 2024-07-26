import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { loginZodSchema } from '@/schemas/auth.schema'

export async function loginValidator(req: Request) {
  const schema = z.promise(z.object(loginZodSchema))
  const fields = {
    ...R.pick(Object.keys(loginZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
