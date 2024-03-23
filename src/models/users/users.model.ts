import mongoose, { Document, Model } from 'mongoose'
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username: { type: String, required: false },
  password: { type: String, required: true },
  image: { type: String, required: false },
  authentication: {
    sessionToken: { type: String, select: false }
  }
})

export const UserModel = mongoose.model('User', UserSchema)

export interface UserDocument extends Document {
  email: string
  username?: string
  password: string
  image?: string
  authentication: {
    sessionToken?: string
  }
}

// User Actions
export const getUserByEmail = (email: string) => UserModel.findOne({ email })
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({ 'authentication.sessionToken': sessionToken })
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject())
