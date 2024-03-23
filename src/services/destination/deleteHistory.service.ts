import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import SearchHistoryDestinations from '../../models/destinations/searchHistoryDestinations.model'
import { NotFoundException } from '../../common/exceptions/exceptions'
dotenv.config()
export const deleteHistoryService = async (req: express.Request, res: express.Response) => {
  try {
    const { sessionToken, title, location } = req.body
    const decodedToken = jwt.verify(sessionToken, process.env.KEY) as JwtPayload
    const idUser = decodedToken.userId

    const deleteResult = await SearchHistoryDestinations.deleteOne({ idUser, title, location })

    if (deleteResult.deletedCount === 0) {
      throw new NotFoundException('History not found')
    }

    res.status(httpStatus.OK).json({ message: 'Delete successful' })
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message).end()
  }
}
