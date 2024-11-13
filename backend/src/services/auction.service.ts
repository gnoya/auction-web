import { BadRequestError, ResourceNotFoundError } from '@/errors/common'
import AuctionRepository from '@/repositories/auction.repository'
import UserRepository from '@/repositories/user.repository'
import {
  transformAuction,
  transformAuctionArray,
} from '@/transforms/auction.transform'
import { PaginationParams } from '@/types/pagination.type'
import { auctionBelongsToUserValidator } from '@/validators/auction/belongs-to-user.validator'

type AuctionServiceParams = {
  auctionRepository?: AuctionRepository
  userRepository?: UserRepository
}

export default class AuctionService {
  private auctionRepository: AuctionRepository
  private userRepository: UserRepository

  constructor({
    auctionRepository,
    userRepository,
  }: AuctionServiceParams = {}) {
    this.auctionRepository = auctionRepository || new AuctionRepository()
    this.userRepository = userRepository || new UserRepository()
  }

  createAuction = async (data: {
    userId: number
    title: string
    description: string
    startingPrice: number
    endTime: Date
  }) => {
    // -------- Check if the user exists
    const user = await this.userRepository.show(data.userId)
    if (!user)
      throw new ResourceNotFoundError(`User with id ${data.userId} not found`)

    // -------- Check if the end time is in the future
    if (data.endTime < new Date())
      throw new BadRequestError('End time must be in the future')

    // -------- Create the auction
    const newAuction = await this.auctionRepository.create({
      ...data,
      currentPrice: data.startingPrice,
    })

    return transformAuction(newAuction)
  }

  getAuction = async (id: number) => {
    // -------- Get the auction
    const auction = await this.auctionRepository.show(id)
    if (!auction)
      throw new ResourceNotFoundError(`Auction with id ${id} not found`)

    return transformAuction(auction)
  }

  getAuctions = async (paginationParams: PaginationParams) => {
    // -------- Get all auctions paginated
    const { data: auctions, pagination } =
      await this.auctionRepository.allPaginated(paginationParams)

    return { data: transformAuctionArray(auctions), pagination }
  }

  getAuctionsByUserId = async (
    userId: number,
    paginationParams: PaginationParams
  ) => {
    // -------- Get all auctions by user id paginated
    const { data: auctions, pagination } =
      await this.auctionRepository.allPaginated(paginationParams, { userId })

    return { data: transformAuctionArray(auctions), pagination }
  }

  updateAuction = async (
    id: number,
    data: { title?: string; description?: string; userId: number }
  ) => {
    const { userId, ...updateData } = data

    // -------- Check if the auction exists
    const auction = await this.auctionRepository.show(id)
    if (!auction)
      throw new ResourceNotFoundError(`Auction with id ${id} not found`)

    // -------- Check if the auction belongs to the user
    await auctionBelongsToUserValidator(auction, userId)

    // -------- Update the auction
    const updatedAuction = await this.auctionRepository.update(id, updateData)

    return transformAuction(updatedAuction)
  }

  deleteAuction = async (data: { auctionId: number; userId: number }) => {
    const { auctionId, userId } = data

    // -------- Check if the auction exists
    const auction = await this.auctionRepository.show(auctionId)
    if (!auction)
      throw new ResourceNotFoundError(`Auction with id ${auctionId} not found`)

    // -------- Check if the auction belongs to the user
    await auctionBelongsToUserValidator(auction, userId)

    return this.auctionRepository.delete(auctionId)
  }
}
