import Express from "express";
import { createServer } from "http";
import db from "./config/db/db";
import helmet from "helmet";
import routes from "./routes";
import cors from 'cors';
import  config  from "./config";
import path from "path";


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

//db connection
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.on("close", function () {
  console.log("DB connection is closed");
});
db.once("open", function () {
  console.log("Connected to MongoDB database!!");
});


const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";

httpServer.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://${host}:${port}`);
});
