import { Router } from 'express'
import { routeHandler } from '@/utils/routeHandler'
import UserController from '@/controllers/user.controller'
import JWTMiddleware from '@/middlewares/jwt.middleware'

const userController = new UserController()
const userRoutes = Router()

userRoutes.use(JWTMiddleware)

userRoutes.get('/users/:id', JWTMiddleware, routeHandler(userController.show))

export default userRoutes
