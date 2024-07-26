import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { bidCreateZodSchema } from '@/schemas/bid.schema'

export async function bidStoreValidator(req: Request) {
  const schema = z.promise(z.object(bidCreateZodSchema))
  const fields = {
    ...R.pick(Object.keys(bidCreateZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
