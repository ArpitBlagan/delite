import express from "express";
import dotenv from "dotenv";
import { router } from "./route";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
dotenv.config();
mongoose.connect(process.env.DATABASE_URL as string).then(() => {
  console.log("connected");
});
const app = express();
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/api", router);
app.listen(process.env.PORT, () => {
  console.log(`server listening on port ${process.env.PORT}`);
});
