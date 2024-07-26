import { BadRequestError, ResourceNotFoundError } from '@/errors/common'
import AuctionRepository from '@/repositories/auction.repository'
import BidRepository from '@/repositories/bid.repository'
import { transformBid, transformBidArray } from '@/transforms/bid.transform'

type BidServiceParams = {
  bidRepository?: BidRepository
  auctionRepository?: AuctionRepository
}

export default class BidService {
  private bidRepository: BidRepository
  private auctionRepository: AuctionRepository

  constructor({ bidRepository, auctionRepository }: BidServiceParams = {}) {
    this.bidRepository = bidRepository || new BidRepository()
    this.auctionRepository = auctionRepository || new AuctionRepository()
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
    // -------- Check if amount is greater than the currentPrice
    const auction = await this.auctionRepository.show(data.auctionId)
    if (!auction) throw new ResourceNotFoundError('Auction not found')

    if (data.amount <= auction.currentPrice)
      throw new BadRequestError(
        'Bid amount must be greater or equal than the current price'
      )

    // -------- Place a bid
    const newBid = await this.bidRepository.create(data)

    // -------- Update the auction currentPrice
    await this.auctionRepository.update(auction.id, {
      currentPrice: data.amount,
    })

    return transformBid(newBid)
  }
}
