import express from 'express'
import { deleteHistoryService } from '../../services/destination/deleteHistory.service'
const deleteHistory = async (req: express.Request, res: express.Response) => {
  deleteHistoryService(req, res)
}
export default deleteHistory
