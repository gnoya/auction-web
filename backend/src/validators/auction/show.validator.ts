import { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/errors/common'

export async function auctionShowValidator(req: Request) {
  const schema = z.promise(
    z.object({
      id: z.coerce.number(),
    })
  )
  const fields = {
    id: req.params.id,
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return validated
}
