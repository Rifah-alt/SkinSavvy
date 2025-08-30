import mongoose from "mongoose";
import dotenv from "dotenv"; 
dotenv.config(); 

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB);
    console.log("Database is running successfully");

    //  List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));

    //  Get last 5 users (sorted by _id descending)
    if (collections.some(c => c.name === "users")) {
      const users = await mongoose.connection.db
        .collection("users")
        .find()
        .sort({ _id: -1 })   // sort newest first
        .limit(5)
        .toArray();

      console.log("Last 5 Users:", users);
    }

  } catch (error) {
    console.log("DB connection error:", error);
    setTimeout(dbConnection, 5000); // retry after 5s
  }
};

export { dbConnection };
