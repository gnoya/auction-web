import { z } from 'zod'

export const bidCreateZodSchema = {
  amount: z.coerce.number(),
}
