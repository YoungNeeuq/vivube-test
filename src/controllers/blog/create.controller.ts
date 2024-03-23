import express from 'express'
import { createService } from '../../services/blogs/create.service'
const createBlog = async (req: express.Request, res: express.Response) => {
  createService(req, res)
}
export default createBlog
