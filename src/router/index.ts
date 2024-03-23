import express from 'express'

import authentication from './authentication.router'
import destination from './destination.router'
import blog from './blog.router'
const router = express.Router()

export default (): express.Router => {
  authentication(router)
  destination(router)
  blog(router)
  return router
}
