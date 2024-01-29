import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
dotenv.config();

const app = express();
app.use(express.json());

/* DB CONNECTION */
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Database Connected!"))
  .catch((err) => console.error(err.message));

/* APP START */
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});

/* APIs */
app.use("/api/auth", authRoutes);

/* ERROR MIDDLEWARE */
app.use(errorMiddleware);
