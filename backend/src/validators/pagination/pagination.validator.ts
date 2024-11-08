import type { Request } from 'express'
import { z } from 'zod'
import { BadRequestError } from '@/errors/common'

export async function paginationValidator(req: Request) {
  const schema = z.promise(
    z.object({
      page: z.coerce.number().int().min(1).optional().default(1),
      limit: z.coerce.number().int().min(1).optional().default(10),
    })
  )

  const fields = {
    page: req.query.page ?? 1,
    limit: req.query.limit ?? 10,
  }

  const validated = await schema.parseAsync(fields).catch((err) => {
    throw new BadRequestError(err)
  })

  return { ...validated }
}
