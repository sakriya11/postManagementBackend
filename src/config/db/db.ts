import mongoose from "mongoose";
import dbConfig from '../index';

const MONGO_URL = dbConfig.db.mongoURL;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URL); 
    console.log(" MongoDB connected successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;


