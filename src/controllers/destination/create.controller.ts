import express from 'express'
import { createNewDestinationService } from '../../services/destination/create.service'
const createDestination = async (req: express.Request, res: express.Response) => {
  createNewDestinationService(req, res)
}
export default createDestination
