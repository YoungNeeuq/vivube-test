import { v2 as cloudinary } from 'cloudinary'
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer, { Multer } from 'multer'
import dotenv from 'dotenv'
dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
})
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'blogs',
    allowed_formats: ['jpg', 'png']
  } as any
})

const uploadCloud: Multer = multer({ storage })

export default uploadCloud
