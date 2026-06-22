import mongoose from "mongoose";

const connectDB = async () => {
  try {
    console.log("Mongo URI:", process.env.MONGO_URI);

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");
  } catch (error) {
    console.log("DB Connection Failed:", error.message);

    process.exit(1); // 🔥 IMPORTANT FIX
  }
};

export default connectDB;