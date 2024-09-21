import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("connected to db");
  } catch (error: any) {
    throw new Error(`failed to connect db error:${error}`);
  }
};

export default connectDb;
