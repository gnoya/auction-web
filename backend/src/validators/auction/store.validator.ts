import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { getAuctionZodSchema } from 'src/schemas/auction.schema'

export async function auctionStoreValidator(req: Request) {
  const auctionZodSchema = getAuctionZodSchema()

  const schema = z.promise(z.object(auctionZodSchema))
  const fields = {
    ...R.pick(Object.keys(auctionZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
