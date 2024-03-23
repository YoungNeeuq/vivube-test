import express from 'express'
import { getHistorySevice } from '../../services/destination/getHistory.service'
const getHistory = async (req: express.Request, res: express.Response) => {
  getHistorySevice(req, res)
}
export default getHistory
