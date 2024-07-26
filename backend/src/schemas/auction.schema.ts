import { z } from 'zod'

export const auctionStoreZodSchema = {
  userId: z.coerce.number(),
  title: z.string(),
  description: z.string(),
  startingPrice: z.coerce.number(),
  endTime: z.coerce.date(),
}

export const auctionUpdateZodSchema = {
  title: z.string().optional(),
  description: z.string().optional(),
}
