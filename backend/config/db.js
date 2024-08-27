import mongoose from "mongoose";
import { envVars }  from "./envVars.js";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(envVars.MONGODB_URI);
        console.log("MongoDB connected: ", conn.connection.host);
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error.message);
        process.exit(1);
    }
};