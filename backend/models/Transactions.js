import { Schema, model } from "mongoose";

const TransactionSchema = new Schema({
  type: {
    type: String,
    enum: ['Income', 'Expense'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  categoryname:{
    type:String,
    required:FinalizationRegistry
  },
  date: {
    type: Date,
    default: Date.now
  }
})



const Transaction = model('Transaction', TransactionSchema)
export default Transaction
