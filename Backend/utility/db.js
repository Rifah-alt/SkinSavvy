import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config(); 

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB).then(() => {
      console.log("Database is running successfully");
    });
  } catch (error) {
    console.log(error);
    setTimeout(5000, dbConnection);
  }
};

export { dbConnection };