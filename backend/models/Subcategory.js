import { Schema, model } from "mongoose";

// models/Subcategory.js

const SubcategorySchema = new Schema(
  {
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
    description: {
      type: String,
      required: false
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  },
  { timestamps: true }
)

const Subcategory = model('Subcategory', SubcategorySchema)

export default Subcategory
