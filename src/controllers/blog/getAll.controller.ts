import express from 'express'
import { getAllSevice } from '../../services/blogs/getAll.service'
const getAll = async (req: express.Request, res: express.Response) => {
  getAllSevice(req, res)
}
export default getAll
