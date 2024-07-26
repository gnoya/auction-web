import { Router } from 'express'
import { routeHandler } from '@/utils/routeHandler'
import AuctionController from '@/controllers/auction.controller'

const auctionController = new AuctionController()
const auctionRoutes = Router()

auctionRoutes.get('/', routeHandler(auctionController.index))
auctionRoutes.post('/', routeHandler(auctionController.store))
auctionRoutes.put('/:id', routeHandler(auctionController.update))
auctionRoutes.get('/:id', routeHandler(auctionController.show))
auctionRoutes.delete('/:id', routeHandler(auctionController.destroy))

auctionRoutes.post('/:id/bid', routeHandler(auctionController.placeBid))
auctionRoutes.get('/:id/bids', routeHandler(auctionController.indexBid))

export default auctionRoutes
