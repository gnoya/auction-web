import { z } from 'zod'

export function getBidZodSchema(optionalArgs: boolean = false) {
  return {
    amount: optionalArgs ? z.coerce.number().optional() : z.coerce.number(),
  }
}
