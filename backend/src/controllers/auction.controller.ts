import { Request } from 'express'
import AuctionService from '@/services/auction.service'

export default class AuctionController {
  private auctionService: AuctionService

  constructor(auctionService: AuctionService = new AuctionService()) {
    this.auctionService = auctionService
  }

  store = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: any // eslint-disable-line @typescript-eslint/no-explicit-any
  }> => {
    // const auction = await this.auctionService.createAuction()

    return { status: 200, data: {} }
  }
}
