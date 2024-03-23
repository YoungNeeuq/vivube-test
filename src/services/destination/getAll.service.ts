import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import { getDestination } from '../../models/destinations/destinations.model'
dotenv.config()
export const getAllSevice = async (req: express.Request, res: express.Response) => {
  try {
    const { location, type } = req.params
    const sortBy = req.query.sortBy as string
    const title = req.query.title as string
    const titleLimit = req.query.titleLimit as string
    const id = req.query.id as string
    const page = parseInt(req.query.page as string) || 1
    const limit = 8
    const posts = await getDestination(location, type, page, limit, sortBy, title, titleLimit, id)
    res.status(httpStatus.OK).json(posts)
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error.message).end()
  }
}
