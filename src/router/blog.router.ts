import express from 'express'
import uploadCloud from '../config/cloudinary.config'
import getAll from '../controllers/blog/getAll.controller'
import createBlog from '../controllers/blog/create.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'
export default (router: express.Router) => {
  router.get('/blog/getAll', getAll)
  router.post('/blog/create', uploadCloud.array('image'), isAuthenticated, createBlog)
}
