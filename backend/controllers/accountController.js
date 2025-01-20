import Account from "../models/Acount.js";

export const addAccount = async (req, res) => {
  try {
    let { name, type, balance = 0, limit } = req.body
    limit = limit !== undefined ? Number(limit) : undefined
    balance = balance !== undefined ? Number(balance) : undefined
    let { userId } = req.user || {}

    if (limit !== undefined && limit > balance) {
      return res.status(400).json({
        error: `Invalid input: limit (${limit}) cannot exceed balance (${balance})`
      })
    }

    const existingAccount = await Account.findOne({ name, type, userId })
    if (existingAccount) {
      return res
        .status(400)
        .json({ error: 'Account with this name and type already exists.' })
    }

    const finalLimit = limit !== undefined ? limit : balance

    const accountData = {
      name,
      type,
      balance,
      limit: finalLimit
    }

    if (userId) {
      accountData.userId = userId
    }

    const account = new Account(accountData)
    const savedAccount = await account.save()

    return res.status(201).json(savedAccount)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAllAccounts = async (req, res) => {
  try {
    const { userId } = req.user || {}
    const accounts = await Account.find({ userId })
    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateAccount = async (req, res) => {
  try {
    let { limit, balance, ...rest } = req.body
    limit = limit !== undefined ? Number(limit) : undefined
    balance = balance !== undefined ? Number(balance) : undefined

    const currentAccount = await Account.findById(req.params.id)
    if (!currentAccount) {
      return res.status(404).json({ error: 'Account not found' })
    }

    if (balance !== undefined && limit !== undefined && limit > balance) {
      return res
        .status(400)
        .json({ error: 'Limit cannot exceed the new balance' })
    }
    if (limit !== undefined &&balance===undefined&& limit > currentAccount.balance) {
      console.log(`Limit${limit} cannot exceed the current balance${currentAccount.balance}`)
      return res
        .status(400)
        .json({ error: 'Limit cannot exceed the current balance' })
    }

    const updateData = {
      ...rest,
      ...(limit !== undefined && { limit }),
      ...(balance !== undefined && { balance })
    }
    const updatedAccount = await Account.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    )

    res.status(200).json(updatedAccount)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteAccount = async (req, res) => {
  try {
    await Account.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: 'Account deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
