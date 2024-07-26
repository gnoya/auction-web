import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { getSignUpZodSchema } from 'src/schemas/auth.schema'

export async function signUpValidator(req: Request) {
  const signUpSchema = getSignUpZodSchema()
  const schema = z.promise(z.object(signUpSchema))

  const fields = {
    ...R.pick(Object.keys(signUpSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
