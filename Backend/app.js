import express from "express";
import cors from "cors";



const app = express(); 
export default app;


// CORS Middleware
app.use(cors());

// JSON Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


