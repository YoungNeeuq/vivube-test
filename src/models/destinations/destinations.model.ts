import mongoosePaginate from 'mongoose-paginate-v2'
import mongoose, { Document, Model, Schema } from 'mongoose'
const DestinationSchema = new mongoose.Schema({
  type: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  location: { type: String, enum: ['hcm', 'dn'], required: true },
  user: { type: Object, required: true },
  views: { type: Number, default: 0 },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
})

DestinationSchema.plugin(mongoosePaginate)

interface IDestinationModel extends Model<IDestinationDocument> {
  paginate: any
}

interface IDestinationDocument extends Document {
  type: string
  title: string
  content: string
  location: string
  user: object
  views: number
  image: string
  createdAt: Date
  date: number
}

// Destination Actions
export const DestinationModel: IDestinationModel = mongoose.model<IDestinationDocument, IDestinationModel>(
  'Destination',
  DestinationSchema
)

export const getDestination = async (
  location: string,
  type: string,
  page: number,
  limit: number,
  sortBy: string,
  title: string,
  titleLimit: string,
  id: string
) => {
  try {
    const options = {
      page,
      limit,
      sort: {}
    }

    if (sortBy === 'views') {
      options.sort = { views: -1 }
    } else if (sortBy === 'lastest') {
      options.sort = { createdAt: -1 }
    } else if (sortBy === 'oldest') {
      options.sort = { createdAt: 1 }
    }
    let result
    if (id) {
      return (result = await filterDestinationById(id as string))
    } else {
      if (title || titleLimit) {
        if (titleLimit) {
          result = await searchDestinationByTitleLimit(titleLimit as string, 1, 5, location)
        } else {
          result = await searchDestinationByTitle(title as string, page as number, limit as number, location)
        }
      } else {
        result = await DestinationModel.paginate({ location, type }, options)
      }
    }

    result.docs = result.docs.map((doc: { toObject: () => any; createdAt: { getTime: () => number } }) => ({
      ...doc.toObject(),
      date: Math.ceil((new Date().getTime() - doc.createdAt.getTime()) / (1000 * 3600 * 24))
    }))

    return result
  } catch (error) {
    throw new Error(`Error getting destinations: ${error.message}`)
  }
}

export const createDestination = async (
  type: string,
  title: string,
  content: string,
  location: string,
  user: object,
  image: string
) => {
  try {
    const newDestination = await DestinationModel.create({
      type,
      title,
      content,
      location,
      user,
      image
    })

    return newDestination.toObject()
  } catch (error) {
    throw new Error('Failed to create destination')
  }
}
export const searchDestinationByTitleLimit = async (
  titleLimit: string,
  page: number,
  limit: number,
  location: string
) => {
  const options = {
    page,
    limit
  }
  try {
    const destinations = await DestinationModel.paginate(
      DestinationModel.find({ title: { $regex: titleLimit, $options: 'i' }, location }),
      options
    )
    return destinations
  } catch (error) {
    throw new Error('Failed to search destinations by Title 1')
  }
}
export const searchDestinationByTitle = async (title: string, page: number, limit: number, location: string) => {
  const options = {
    page,
    limit
  }
  try {
    const destinations = await DestinationModel.paginate(
      DestinationModel.find({ title: { $regex: title, $options: 'i' }, location }),
      options
    )
    return destinations
  } catch (error) {
    throw new Error('Failed to search destinations by Title')
  }
}

export const filterDestinationById = async (id: string) => {
  const destination = await DestinationModel.findById(id)
  return destination
}
