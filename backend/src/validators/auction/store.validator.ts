import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { auctionStoreZodSchema } from '@/schemas/auction.schema'

export async function auctionStoreValidator(req: Request) {
  const schema = z.promise(z.object(auctionStoreZodSchema))
  const fields = {
    ...R.pick(Object.keys(auctionStoreZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
