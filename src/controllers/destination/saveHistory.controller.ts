import express from 'express'
import { saveHistorySevice } from '../../services/destination/saveHistory.service'
const saveHistory = async (req: express.Request, res: express.Response) => {
  saveHistorySevice(req, res)
}
export default saveHistory
