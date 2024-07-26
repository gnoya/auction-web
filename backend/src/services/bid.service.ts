import BidRepository from '@/repositories/bid.repository'

type BidServiceParams = {
  bidRepository?: BidRepository
}

export default class BidService {
  bidRepository: BidRepository

  constructor({ bidRepository }: BidServiceParams = {}) {
    this.bidRepository = bidRepository || new BidRepository()
  }
}
