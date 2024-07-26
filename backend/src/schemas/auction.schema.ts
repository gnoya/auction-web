import { z } from 'zod'

export function getAuctionZodSchema(optionalArgs: boolean = false) {
  return {
    userId: optionalArgs ? z.coerce.number().optional() : z.coerce.number(),
    title: optionalArgs ? z.string().optional() : z.string(),
    description: optionalArgs ? z.string().optional() : z.string(),
    startingPrice: optionalArgs
      ? z.coerce.number().optional()
      : z.coerce.number(),
    endTime: optionalArgs ? z.coerce.date().optional() : z.coerce.date(),
  }
}
