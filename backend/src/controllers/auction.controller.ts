import { Request } from 'express'
import AuctionService from '@/services/auction.service'

export default class AuctionController {
  private auctionService: AuctionService

  constructor(auctionService: AuctionService = new AuctionService()) {
    this.auctionService = auctionService
  }

  index = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }

  show = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }

  store = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 201, data: 2 }
  }

  update = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }

  destroy = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }

  placeBid = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }

  indexBid = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    req: Request
  ): Promise<{
    status: number
    data: number
  }> => {
    return { status: 200, data: 2 }
  }
}
