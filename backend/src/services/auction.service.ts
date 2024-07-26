import { ResourceNotFoundError } from '@/errors/common'
import AuctionRepository from '@/repositories/auction.repository'
import UserRepository from '@/repositories/user.repository'
import { transformAuction } from '@/transforms/auction.transform'

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

  async createAuction(data: {
    userId: number
    title: string
    description: string
    initialPrice: number
  }) {
    const user = await this.userRepository.show(data.userId)
    if (!user)
      throw new ResourceNotFoundError(`User with id ${data.userId} not found`)

    const newAuction = await this.auctionRepository.create(data)
    return transformAuction(newAuction)
  }
}
