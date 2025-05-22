import Express from "express";
import { createServer } from "http";
import helmet from "helmet";
import routes from "./routes";
import cors from 'cors';
import  config  from "./config";
import path from "path";
import connectDB from "./config/db/db";
import mongoose from "mongoose";


const app = Express();
const httpServer = createServer(app);

app.use(cors({
  origin:config.app.allowedOrigin, 
  credentials: true, 
}));

app.use(Express.json());
app.use(helmet())



app.use('/api',routes)
app.use('/uploads', Express.static(path.join(__dirname, '..', 'uploads')));

// Connect to DB
connectDB();

// Listen for DB events
const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("close", () => {
  console.log("MongoDB connection closed");
});
db.once("open", () => {
  console.log("Connected to MongoDB database!!");
});


const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
