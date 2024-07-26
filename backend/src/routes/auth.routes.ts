import { Router } from 'express'
import { routeHandler } from '@/utils/routeHandler'
import AuthController from '@/controllers/auth.controller'

const authController = new AuthController()
const authRoutes = Router()

authRoutes.post('/login', routeHandler(authController.login))
authRoutes.post('/sign-up', routeHandler(authController.signUp))
authRoutes.get('/profile', routeHandler(authController.profile))

export default authRoutes
