import express from 'express'
import httpStatus from 'http-status'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v2 as cloudinary } from 'cloudinary'
import { BlogModel } from '../../models/blogs/blog.model'
import { BlogValidation } from '../../request/blog/blog.request'
import { UserModel } from '../../models/users/users.model'
import { NotFoundException } from '../../common/exceptions/exceptions'
dotenv.config()

export const createService = async (req: express.Request, res: express.Response) => {
  try {
    const fileData: Express.Multer.File[] = []

    if (!req.files) {
      throw new NotFoundException('No files were uploaded.')
    }

    Object.values(req.files).forEach((fileOrArray) => {
      if (Array.isArray(fileOrArray)) {
        fileOrArray.forEach((file) => {
          fileData.push(file)
        })
      } else {
        fileData.push(fileOrArray)
      }
    })
    const { error } = BlogValidation.validate(req.body)
    if (error) {
      fileData.forEach((file) => {
        cloudinary.uploader.destroy(file.filename)
      })
      throw new NotFoundException('NOT FOUND')
    }

    const sessionToken = req.headers['authorization']
    const { type, title, content, location, views, comment } = req.body

    const images = fileData.map((file) => file.path)
    if (images.length === 0) {
      fileData.forEach((file) => {
        cloudinary.uploader.destroy(file.filename)
      })
      throw new NotFoundException('No images were uploaded.')
    }

    const uppercaseType = type.toUpperCase()
    const decodedToken: any = jwt.verify(sessionToken, process.env.KEY)
    const userId = decodedToken.userId
    const user = await UserModel.findById(userId)
    const blog = new BlogModel({
      type: uppercaseType,
      title,
      content,
      location,
      user: user?._id,
      views,
      imagebanner: images[0],
      image: images,
      comment
    })
    const newBlog = await blog.save()
    return res.status(httpStatus.OK).json(newBlog)
  } catch (error) {
    return res.status(httpStatus.NOT_FOUND).json(error.message).end()
  }
}
