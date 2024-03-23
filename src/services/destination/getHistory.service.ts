import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import SearchHistoryDestinations from '../../models/destinations/searchHistoryDestinations.model'
dotenv.config()
export const getHistorySevice = async (req: express.Request, res: express.Response) => {
  try {
    const sessionToken = req.query.sessionToken as string
    const location = req.query.location as string
    const decodedToken = jwt.verify(sessionToken, process.env.KEY) as JwtPayload
    const idUser = decodedToken.userId

    const searchHistory = await SearchHistoryDestinations.find({ idUser, location }).sort({ createdAt: -1 }).limit(5)
    res.status(httpStatus.OK).json(searchHistory)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message).end()
  }
}
