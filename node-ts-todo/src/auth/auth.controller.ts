import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import { User } from './auth.entity'
import { AppDataSource } from '../..'
import bcryptjs from 'bcryptjs'
import { instanceToPlain } from 'class-transformer'
import { sign } from 'jsonwebtoken'

class AuthController {
  public async register(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const { name, email, password } = req.body

    // Check if the user already exists
    const user = await AppDataSource.manager
      .createQueryBuilder(User, 'user')
      .where('user.email = :email', { email })
      .getOne()

    if (user) {
      return res.status(400).json({ error: 'This email address is already used' })
    }

    const newUser = new User()
    newUser.name = name
    newUser.email = email
    newUser.password = await bcryptjs.hash(password, 10)

    let createduser: User
    try {
      createduser = await AppDataSource.getRepository(User).save(newUser)
      createduser = instanceToPlain(createduser) as User
      return res.json(createduser).status(201)
    } catch (_error) {
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }

  public async login(req: Request, res: Response): Promise<Response> {
    const error = validationResult(req)
    if (!error.isEmpty()) {
      return res.status(400).json({ error: error.array() })
    }

    const { email, password } = req.body
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          email,
        },
      })
      if (!user) {
        return res.status(400).json({ error: 'Invalid Credentials' })
      }

      if (!(await bcryptjs.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid Credentials' })
      }

      //   generate access and refresh tokens
      const accessToken = sign({ id: user.id }, 'secret', {
        expiresIn: '2d',
      })
      const refreshToken = sign({ id: user.id }, 'secret', {
        expiresIn: '2d',
      })

      res.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 604800000), // 2 days
        httpOnly: true,
      })

      res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 604800000), // 2 days
        httpOnly: true,
      })

      return res.json({
        message: 'Login successful',
      })
    } catch (_error) {
      return res.json({ error: 'Internal Server Error' })
    }
  }

  public async profile(req: Request, res: Response): Promise<Response> {
    try {
      const user = await AppDataSource.getRepository(User).findOne({
        where: {
          id: req.user?.id,
        },
      })
      return res.json(user)
    } catch (_error) {
      return res.json({ error: 'Internal Server Error' })
    }
  }

  public async logout(req: Request, res: Response): Promise<Response> {
    res.clearCookie('accessToken')
    res.clearCookie('refreshToken')
    return res.json({ message: 'Logout successful' })
  }
}

export const authController = new AuthController()
