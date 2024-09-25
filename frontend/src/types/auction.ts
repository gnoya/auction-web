import { Bid } from './bid'
import { User } from './user'

export type Auction = {
  id: number
  userId: number
  title: string
  description: string
  startingPrice: number
  currentPrice: number
  endTime: string
  user: User
  bids: Bid[]
  createdAt: string
  updatedAt: string
}
