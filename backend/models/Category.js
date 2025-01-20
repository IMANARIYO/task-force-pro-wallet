import { Schema, model } from 'mongoose'

const CategorySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  budgetAmount: {
    type: Number,
    required: true
  },
  currentSpending: {
    type: Number,
    default: 0
  },
  accumulatedfunds: {
    type: Number,
    default: 0,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = model('Category', CategorySchema)

export default Category
