import mongoose, { Schema, Document } from 'mongoose'

interface Blog extends Document {
  type: string
  title: string
  content: string
  location: string
  user: mongoose.Types.ObjectId
  views: number
  imagebanner: string
  image: string[]
  comment?: object[]
  createdAt: Date
}

const blogSchema: Schema = new Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, enum: ['Hồ Chí Minh', 'Đà Nẵng'], required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  views: { type: Number, default: 0 },
  imagebanner: { type: String, required: false },
  image: { type: [String], required: false },
  comment: { type: [Object], required: false },
  createdAt: { type: Date, default: Date.now }
})

export const BlogModel = mongoose.model<Blog>('Blog', blogSchema)
