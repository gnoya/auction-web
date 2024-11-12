import { Router } from 'express'
import { routeHandler } from '@/utils/routeHandler'
import AuctionController from '@/controllers/auction.controller'
import JWTMiddleware from '@/middlewares/jwt.middleware'

const auctionController = new AuctionController()
const auctionRoutes = Router()

auctionRoutes.use(JWTMiddleware)

auctionRoutes.get('/auctions', routeHandler(auctionController.index))
auctionRoutes.post('/auctions', routeHandler(auctionController.store))
auctionRoutes.put('/auctions/:id', routeHandler(auctionController.update))
auctionRoutes.get('/auctions/:id', routeHandler(auctionController.show))
auctionRoutes.delete('/auctions/:id', routeHandler(auctionController.destroy))

auctionRoutes.post(
  '/auctions/:id/bid',
  routeHandler(auctionController.placeBid)
)
auctionRoutes.get(
  '/auctions/:id/bids',
  routeHandler(auctionController.indexBids)
)

export default auctionRoutes
