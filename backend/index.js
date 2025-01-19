import accountsRouter from "./routes/accountRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import categoriesRouter from "./routes/categoryRoutes.js";
import connectDB from "./config/db.js";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import subcategoryRouter from "./routes/subcategoryRouter.js";
import summaryRouter from "./routes/summaryRoutes.js";
import transactionsRouter from "./routes/transactionRoutes.js";

dotenv.config()

connectDB()
const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/api/auth', authRoutes)
app.use('/api/accounts/', accountsRouter)
app.use('/api/transactions', transactionsRouter)
app.use('/api/summary', summaryRouter)
app.use('/api/categories', categoriesRouter)
app.use('/api/subcategory', subcategoryRouter)

const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
