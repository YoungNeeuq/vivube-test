import mongoose, { Schema, Document } from 'mongoose'
interface ISearchHistoryDestinations extends Document {
  idUser: string
  title: string
  location: string
  createdAt: Date
}

const SearchHistoryDestinationsSchema: Schema = new Schema({
  idUser: { type: String },
  title: { type: String },
  location: { type: String },
  createdAt: { type: Date, default: Date.now }
})
const SearchHistoryDestinations = mongoose.model<ISearchHistoryDestinations>(
  'SearchHistoryDestinations',
  SearchHistoryDestinationsSchema
)

export default SearchHistoryDestinations
