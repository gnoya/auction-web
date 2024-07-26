import BidRepository from '@/repositories/bid.repository'
import { transformBid, transformBidArray } from '@/transforms/bid.transform'

type BidServiceParams = {
  bidRepository?: BidRepository
}

export default class BidService {
  private bidRepository: BidRepository

  constructor({ bidRepository }: BidServiceParams = {}) {
    this.bidRepository = bidRepository || new BidRepository()
  }

  getAllBidsByAuctionId = async (auctionId: number) => {
    // -------- Get all bids by auctionId
    const bids = await this.bidRepository.allByAuctionId(auctionId)

    return transformBidArray(bids)
  }

  placeBid = async (data: {
    userId: number
    auctionId: number
    amount: number
  }) => {
    // -------- Place a bid
    const newBid = await this.bidRepository.create(data)

    return transformBid(newBid)
  }
}
