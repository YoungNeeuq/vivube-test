import express from 'express'
import { RegisterService } from '../../services/authentication/register.service'
const register = async (req: express.Request, res: express.Response) => {
  RegisterService(req, res)
}
export default register
