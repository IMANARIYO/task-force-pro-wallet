import Transaction from "./Transactions.js";
import { Schema, model } from "mongoose";

const AccountSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['Bank', 'Mobile Money', 'Cash'],
    required: true
  },
  balance: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  limit: {
    type: Number,
    default: function () {
      return this.balance
    }
  }
})

AccountSchema.index({ userId: 1, name: 1, type: 1 }, { unique: true })

AccountSchema.pre('findOneAndDelete', async function (next) {
  try {
    const accountId = this.getQuery()['_id']

    const transactions = await Transaction.find({ account: accountId })

    if (transactions.length > 0) {
      await Transaction.deleteMany({ account: accountId })
    }

    next()
  } catch (error) {
    next(error)
  }
})

const Account = model('Account', AccountSchema)
export default Account
