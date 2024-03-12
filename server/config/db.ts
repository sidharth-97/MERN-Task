import mongoose from "mongoose";

const ConnectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI as string)
        console.log("MongoDB connected");
    } catch (error) {
        console.log(`Error--${error}`);
        process.exit(1)
    }
} 

export default ConnectDB;