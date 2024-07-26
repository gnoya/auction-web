import { ResourceNotFoundError } from '@/errors/common'
import AuctionRepository from '@/repositories/auction.repository'
import UserRepository from '@/repositories/user.repository'
import {
  transformAuction,
  transformAuctionArray,
} from '@/transforms/auction.transform'
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

  getAllAuctions = async () => {
    // -------- Get all auctions
    const auctions = await this.auctionRepository.all()

    return transformAuctionArray(auctions)
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
