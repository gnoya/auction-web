import { Request } from 'express'
import AuctionService from '@/services/auction.service'
import { auctionShowValidator } from '@/validators/auction/show.validator'
import { reqToUserId } from '@/utils/jwt'
import { AuctionTransformed } from '@/transforms/auction.transform'
import { auctionUpdateValidator } from '@/validators/auction/update.validator'
import { auctionStoreValidator } from '@/validators/auction/store.validator'
import BidService from '@/services/bid.service'
import { BidTransformed } from '@/transforms/bid.transform'
import { bidStoreValidator } from '@/validators/bid/store.validator'

type AuctionControllerParams = {
  auctionService?: AuctionService
  bidService?: BidService
}

export default class AuctionController {
  private auctionService: AuctionService
  private bidService: BidService

  constructor({ auctionService, bidService }: AuctionControllerParams = {}) {
    this.auctionService = auctionService || new AuctionService()
    this.bidService = bidService || new BidService()
  }

  index = async (): Promise<{
    status: number
    data: AuctionTransformed[]
  }> => {
    // -------- Get all auctions
    const auctions = await this.auctionService.getAllAuctions()

    return { status: 200, data: auctions }
  }

  show = async (
    req: Request
  ): Promise<{
    status: number
    data: AuctionTransformed
  }> => {
    // -------- Validate the request
    const { id } = await auctionShowValidator(req)

    // -------- Get the auction
    const auction = await this.auctionService.getAuction(id)

    return { status: 200, data: auction }
  }

  store = async (
    req: Request
  ): Promise<{
    status: number
    data: AuctionTransformed
  }> => {
    // -------- Validate the request
    const storeData = await auctionStoreValidator(req)

    // -------- Get the requester userId
    const myUserId = reqToUserId(req)

    // -------- Create the auction
    const auction = await this.auctionService.createAuction({
      ...storeData,
      userId: myUserId,
    })

    return { status: 201, data: auction }
  }

  update = async (
    req: Request
  ): Promise<{
    status: number
    data: AuctionTransformed
  }> => {
    // -------- Validate the request
    const { id } = await auctionShowValidator(req)
    const updateData = await auctionUpdateValidator(req)

    // -------- Get the requester userId
    const myUserId = reqToUserId(req)

    // -------- Update the auction
    const auction = await this.auctionService.updateAuction(id, {
      ...updateData,
      userId: myUserId,
    })

    return { status: 200, data: auction }
  }

  destroy = async (
    req: Request
  ): Promise<{
    status: number
  }> => {
    // -------- Validate the request
    const { id } = await auctionShowValidator(req)

    // -------- Get the requester userId
    const myUserId = reqToUserId(req)

    // -------- Delete the auction
    await this.auctionService.deleteAuction({ auctionId: id, userId: myUserId })

    return { status: 200 }
  }

  placeBid = async (
    req: Request
  ): Promise<{
    status: number
    data: BidTransformed
  }> => {
    // -------- Validate the request
    const { id: auctionId } = await auctionShowValidator(req)
    const { amount } = await bidStoreValidator(req)

    // -------- Get the requester userId
    const myUserId = reqToUserId(req)

    // -------- Place a bid
    const bid = await this.bidService.placeBid({
      userId: myUserId,
      auctionId,
      amount,
    })

    return { status: 201, data: bid }
  }

  indexBids = async (
    req: Request
  ): Promise<{
    status: number
    data: BidTransformed[]
  }> => {
    // -------- Validate the request
    const { id: auctionId } = await auctionShowValidator(req)

    // -------- Get all bids
    const bids = await this.bidService.getAllBidsByAuctionId(auctionId)

    return { status: 200, data: bids }
  }
}