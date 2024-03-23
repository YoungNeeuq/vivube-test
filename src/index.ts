import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import EventEmitter from 'events'
import router from './router'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
const app = express()

dotenv.config()

app.use(
  cors({
    credentials: true
  })
)

EventEmitter.defaultMaxListeners = 15
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

server.listen(process.env.PORT, () => {
  console.log('Server running on http://localhost:' + process.env.PORT)
})

mongoose.Promise = Promise
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.on('error', (error: Error) => console.log(error))
app.use('/', router())
