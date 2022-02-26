import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import connectDB from "./config/db.js";

colors.enable();

dotenv.config();

await connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.green.underline);
});
