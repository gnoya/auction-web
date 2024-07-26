import { Request } from 'express'
import { z } from 'zod'
import * as R from 'ramda'
import { BadRequestError } from '@/errors/common'
import { auctionUpdateZodSchema } from '@/schemas/auction.schema'

export async function auctionUpdateValidator(req: Request) {
  const schema = z.promise(z.object(auctionUpdateZodSchema))
  const fields = {
    ...R.pick(Object.keys(auctionUpdateZodSchema), req.body),
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
