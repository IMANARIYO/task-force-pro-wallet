import mongoose from "mongoose";

const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error('MongoDB connection error:', err);
  }
};

export default connectDB;
