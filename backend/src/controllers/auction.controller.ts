import { Request } from 'express'
import AuctionService from '@/services/auction.service'

export default class AuctionController {
  auctionService: AuctionService

  constructor(auctionService: AuctionService = new AuctionService()) {
    this.auctionService = auctionService
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async store(req: Request): Promise<{
    status: number
    data: any // eslint-disable-line @typescript-eslint/no-explicit-any
  }> {
    // const auction = await this.auctionService.createAuction()

    return { status: 200, data: {} }
  }
}
