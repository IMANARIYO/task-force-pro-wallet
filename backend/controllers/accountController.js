import Account from "../models/Acount.js";

export const addAccount = async (req, res) => {
  try {
    const { name, type, balance = 0, limit } = req.body // Default balance to 0
    const { userId } = req.user || {}


    // Validation: Limit cannot exceed balance
    if (limit !== undefined && limit > balance) {
      return res
        .status(400)
        .json({
          error: `Invalid input: limit (${limit}) cannot exceed balance (${balance})`
        })
    }

    // Check if an account with the same name and type already exists
    const existingAccount = await Account.findOne({ name, type })
    if (existingAccount) {
      return res
        .status(400)
        .json({ error: 'Account with this name and type already exists.' })
    }

    // Use balance as the limit if limit is not provided
    const finalLimit = limit !== undefined ? limit : balance

    // Create account
    const accountData = {
      name,
      type,
      balance,
      limit: finalLimit
    }

    // Include userId if provided
    if (userId) {
      accountData.userId = userId
    }

    const account = new Account(accountData)
    const savedAccount = await account.save()

    return res.status(201).json(savedAccount)
  } catch (error) {
    console.error('Error adding account:', error)
    res.status(500).json({ error: error.message })
  }
}

export const getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.find()
    res.status(200).json(accounts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateAccount = async (req, res) => {
  try {
    const { limit, ...rest } = req.body

    const currentAccount = await Account.findById(req.params.id)
    if (!currentAccount) {
      return res.status(404).json({ error: 'Account not found' })
    }

    if (limit !== undefined && limit > currentAccount.balance) {
      return res
        .status(400)
        .json({ error: 'Limit cannot exceed the current balance' })
    }

    const updateData = {
      ...rest,
      ...(limit !== undefined && { limit })
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
