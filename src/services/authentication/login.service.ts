import httpStatus from 'http-status'
import express from 'express'
import bcrypt from 'bcrypt'
import { getUserByEmail } from '../../models/users/users.model'
import { configJWT } from '../../common/logic/authentication/configjwt'
import { UnauthorizedException } from '../../common/exceptions/exceptions'
export const LoginSevice = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  const { email, password } = req.body
  try {
    const user = await getUserByEmail(email)
    if (!user) {
      throw new UnauthorizedException('Your email is not existed.')
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      throw new UnauthorizedException('Password is incorrect. Please try again.')
    }

    user.authentication.sessionToken = configJWT(user._id)
    await user.save()

    return res.status(httpStatus.OK).json(user).end()
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(error.message).end()
  }
}
