import express from 'express'
import httpStatus from 'http-status'
import { BlogModel } from '../../models/blogs/blog.model'
import { UserModel } from '../../models/users/users.model'
import moment from 'moment'
export const getAllSevice = async (req: express.Request, res: express.Response) => {
  try {
    const type = req.query.type as string
    const uppercaseType = type.toUpperCase()
    if (type == 'top5') {
      const blogs = await BlogModel.aggregate([{ $sort: { views: -1 } }, { $limit: 5 }])
      await BlogModel.populate(blogs, {
        path: 'user',
        model: UserModel,
        select: '-email -password'
      })
      blogs.forEach((blog) => {
        blog.date = moment().diff(moment(blog.createdAt), 'days')
      })
      return res.status(httpStatus.OK).json(blogs)
    } else {
      const blogs = await BlogModel.aggregate([
        {
          $match: { type: uppercaseType }
        }
      ])
      await BlogModel.populate(blogs, {
        path: 'user',
        model: UserModel,
        select: '-email -password'
      })
      blogs.forEach((blog) => {
        blog.date = moment().diff(moment(blog.createdAt), 'days')
      })
      return res.status(httpStatus.OK).json(blogs)
    }
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json(error.message).end()
  }
}
