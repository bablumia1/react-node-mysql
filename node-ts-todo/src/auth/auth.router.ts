import { Router } from 'express'
import { authController } from './auth.controller'
import { authCreateValidator, loginValidator } from './auth.validator'
import { authenticatedUserMiddleware } from './authenticatedUserMiddleware'

export const authRouter: Router = Router()

authRouter.post('/register', authCreateValidator, authController.register)
authRouter.post('/login', loginValidator, authController.login)
authRouter.get('/profile', authenticatedUserMiddleware, authController.profile)
authRouter.get('/logout', authController.logout)
