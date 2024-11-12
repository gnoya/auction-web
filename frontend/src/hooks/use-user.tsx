import { getUser } from '@/api/user'
import useSWR from 'swr'

const fetcher = ([, userId]: [string, number], signal?: AbortSignal) =>
  getUser(userId, signal)

export function useUser(userId: number | undefined) {
  return useSWR(userId ? ['get-user', userId] : null, fetcher)
}
