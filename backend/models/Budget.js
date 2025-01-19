import { Schema, model } from "mongoose";

const BudgetSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
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
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Budget = model('Budget', BudgetSchema)
export default Budget
