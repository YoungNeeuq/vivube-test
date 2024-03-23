import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import { createDestination } from '../../models/destinations/destinations.model'
import { UserModel } from '../../models/users/users.model'
dotenv.config()
export const createNewDestinationService = async (req: Request, res: Response) => {
  try {
    const sessionToken = req.headers['authorization']
    const decodedToken: any = jwt.verify(sessionToken, process.env.KEY)
    const userId = decodedToken.userId
    const user = await UserModel.findById(userId)
    const { type, title, content, location, image } = req.body
    const newDestination = await createDestination(type, title, content, location, user, image)

    res.status(httpStatus.OK).json(newDestination)
  } catch (error) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: 'Failed to create new destination' })
  }
}
