import express from 'express'
import getAll from '../controllers/destination/getAll.controller'
import getHistory from '../controllers/destination/getHistory.controller'
import saveHistory from '../controllers/destination/saveHistory.controller'
import deleteHistory from '../controllers/destination/deleteHistory.controller'
import { isAuthenticated } from '../middlewares/auth.middleware'
export default (router: express.Router) => {
  router.get('/destination/:location/:type', getAll)
  router.post('/destination/searchhistory', saveHistory)
  router.post('/destination/deletesearchhistory', deleteHistory)
  router.get('/destination/searchhistory', getHistory)
}
