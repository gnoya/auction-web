import { Router } from 'express'
import { routeHandler } from '@/utils/routeHandler'
import AuctionController from '@/controllers/auction.controller'

const auctionController = new AuctionController()
const auctionRoutes = Router()

auctionRoutes.post('/login', routeHandler(auctionController.store))

export default auctionRoutes
