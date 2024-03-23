import express from 'express'
import { LoginSevice } from '../../services/authentication/login.service'
const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  LoginSevice(req, res, next)
}
export default login
