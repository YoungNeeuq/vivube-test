import express from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import httpStatus from 'http-status'
import { getUserByEmail, createUser } from '../../models/users/users.model'
import { UnauthorizedException } from '../../common/exceptions/exceptions'
dotenv.config()
export const RegisterService = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body
    const username: string = ''
    const image: string = ''
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      throw new UnauthorizedException('Your email is existed. Please try another email.')
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({
      email,
      username,
      password: hashedPassword,
      image,
      authentication: {}
    })

    return res.status(httpStatus.OK).json(user).end()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(error.message).end()
  }
}
