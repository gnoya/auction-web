import { BadRequestError, ResourceNotFoundError } from '@/errors/common'
import AuctionRepository from '@/repositories/auction.repository'
import BidRepository from '@/repositories/bid.repository'
import TransactionRepository from '@/repositories/transaction.repository'
import { transformBid, transformBidArray } from '@/transforms/bid.transform'
import Broadcaster from '@/broadcaster/broadcaster'
import { PaginationParams } from '@/types/pagination.type'

type BidServiceParams = {
  bidRepository?: BidRepository
  auctionRepository?: AuctionRepository
  transactionRepository?: TransactionRepository
  broadcaster?: Broadcaster
}

export default class BidService {
  private bidRepository: BidRepository
  private auctionRepository: AuctionRepository
  private transactionRepository: TransactionRepository
  private broadcaster: Broadcaster

  constructor({
    bidRepository,
    auctionRepository,
    transactionRepository,
    broadcaster,
  }: BidServiceParams = {}) {
    this.bidRepository = bidRepository || new BidRepository()
    this.auctionRepository = auctionRepository || new AuctionRepository()
    this.transactionRepository =
      transactionRepository || new TransactionRepository()
    this.broadcaster = broadcaster || new Broadcaster()
  }

  getBidsByAuctionId = async (
    auctionId: number,
    paginationParams: PaginationParams
  ) => {
    // -------- Get all bids by auctionId
    const { data: bids, pagination } =
      await this.bidRepository.allPaginatedByAuctionId(
        auctionId,
        paginationParams
      )

    return { data: transformBidArray(bids), pagination }
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

    // -------- Create a new bid and update the currentPrice with a transaction
    const newBid = await this.transactionRepository.transaction(async (tx) => {
      await this.auctionRepository.update(
        auction.id,
        {
          currentPrice: data.amount,
        },
        tx
      )

      return await this.bidRepository.create(data, tx)
    })

    // -------- Broadcast the new bid
    this.broadcaster.broadcast({
      event: `auctions/${data.auctionId}/new-bid`,
      data: {
        newPrice: data.amount,
      },
    })

    return transformBid(newBid)
  }
}
