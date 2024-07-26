import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { getBidZodSchema } from 'src/schemas/bid.schema'

export async function bidStoreValidator(req: Request) {
  const bidZodSchema = getBidZodSchema()

  const schema = z.promise(z.object(bidZodSchema))
  const fields = {
    ...R.pick(Object.keys(bidZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
