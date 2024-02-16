import { Request, Response, NextFunction } from 'express'
import { verify } from 'jsonwebtoken'
import { User } from './auth.entity'
import { AppDataSource } from '../..'

interface Payload {
  id: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export const authenticatedUserMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Response | void> => {
  try {
    const accessToken = req.cookies['accessToken']

    const payload: Payload = verify(accessToken, 'secret') as Payload

    if (!payload) {
      return res.status(401).send({
        message: 'Unauthenticated',
      })
    }

    const user = await AppDataSource.getRepository(User).findOne({
      where: {
        id: payload.id,
      },
    })

    if (!user) {
      return res.status(401).send({
        message: 'Unauthenticated',
      })
    }

    req.user = user
    next()
  } catch (e) {
    console.error(e)
    return res.status(401).send({
      message: 'Unauthenticated',
    })
  }
}
