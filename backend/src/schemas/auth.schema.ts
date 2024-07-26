import { z } from 'zod'

export function getLoginZodSchema() {
  return {
    email: z.string(),
    password: z.string(),
  }
}

export function getSignUpZodSchema() {
  return {
    ...getLoginZodSchema(),
    name: z.string(),
  }
}
