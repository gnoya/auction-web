import { User } from './user'

export type Bid = {
  id: number
  auctionId: number
  userId: number
  amount: number
  createdAt: string
  user?: User
}
