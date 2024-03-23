import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import SearchHistoryDestinations from '../../models/destinations/searchHistoryDestinations.model'
dotenv.config()
export const saveHistorySevice = async (req: express.Request, res: express.Response) => {
  try {
    const { token, title, location } = req.body
    const decodedToken = jwt.verify(token, process.env.KEY) as JwtPayload
    const idUser = decodedToken.userId
    const searchHistory = await SearchHistoryDestinations.create({
      idUser,
      title,
      location
    })
    return res.status(httpStatus.OK).json(searchHistory).end()
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR)
  }
}
