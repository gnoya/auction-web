import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { signUpZodSchema } from '@/schemas/auth.schema'

export async function signUpValidator(req: Request) {
  const schema = z.promise(z.object(signUpZodSchema))
  const fields = {
    ...R.pick(Object.keys(signUpZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
