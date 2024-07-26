import { z } from 'zod'

export const loginZodSchema = {
  email: z.string().email(),
  password: z.string(),
}

export const signUpZodSchema = {
  ...loginZodSchema,
  name: z.string(),
}
