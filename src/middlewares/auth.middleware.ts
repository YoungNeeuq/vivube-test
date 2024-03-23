import express from 'express'
import { merge, get } from 'lodash'

import { getUserBySessionToken } from '../models/users/users.model'
import { UnauthorizedException } from '../common/exceptions/exceptions'
import httpStatus from 'http-status'
export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.headers['authorization']

    if (!sessionToken) {
      throw new UnauthorizedException('Unauthorized')
    }

    const existingUser = await getUserBySessionToken(sessionToken)

    if (!existingUser) {
      throw new UnauthorizedException('Unauthorized')
    }

    merge(req, { identity: existingUser })

    return next()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(error.message).end()
  }
}
