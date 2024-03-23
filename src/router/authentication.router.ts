import express from 'express'
import register from '../controllers/authentication/register.controller'
import login from '../controllers/authentication/login.controller'
import { loginValidation } from '../request/authentication/login.request'
import { registerValidation } from '../request/authentication/register.request'
import validate from '../middlewares/validate.middleware'
export default (router: express.Router) => {
  router.post('/authen/register', validate(registerValidation), register)
  router.post('/authen/login', validate(loginValidation), login)
}
