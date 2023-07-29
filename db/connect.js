import mongoose from "mongoose"
import dotenv from 'dotenv';




mongoose.set("strictQuery", false);
dotenv.config();

const connectDB = (url) => {
    return mongoose.connect(url)
}

export default connectDB