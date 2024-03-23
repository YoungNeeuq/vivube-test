import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
export function configJWT(id: any) {
  const token = jwt.sign({ userId: id }, process.env.KEY, { expiresIn: '7d' })
  return token
}
