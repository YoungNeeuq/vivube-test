import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { Document, Model, Schema } from 'mongoose'
const CommentBlogSchema = new mongoose.Schema({
  content: { type: String, required: true },
  user: { type: Object, required: true },
  like: { type: Number, require: false },
  createdAt: { type: Date, default: Date.now }
})

CommentBlogSchema.plugin(mongoosePaginate)

interface ICommentBlogModel extends Model<ICommentBlogDocument> {
  paginate: any
}

interface ICommentBlogDocument extends Document {
  content: string
  user: object
  like: number
  createdAt: Date
  date: number
}

// CommentBlog Actions
export const BlogModel: ICommentBlogModel = mongoose.model<ICommentBlogDocument, ICommentBlogModel>(
  'CommentBlog',
  CommentBlogSchema
)
