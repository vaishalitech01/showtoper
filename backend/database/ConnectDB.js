import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const ConnectDB = async () => {
  try {
    // await mongoose.connect(process.env.MONGO_URI);
     await mongoose.connect("mongodb+srv://vaishalitechinfo_db_user:ATGoOusKCwAxYUgH@cluster0.omusakb.mongodb.net/");
    console.log("MongoDB connected successfully");
    } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default ConnectDB;