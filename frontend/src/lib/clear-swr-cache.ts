import { mutate } from 'swr'

export const clearSWRCache = () =>
  mutate(() => true, undefined, { revalidate: false })
