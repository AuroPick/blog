import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config.js";

import users from "./routes/users.js";
import posts from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/users", users);
app.use("/posts", posts);

mongoose
  .connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Uygulama ${PORT} portunda başlatıldı.`))
  )
  .catch((error) => console.log(error));

mongoose.set("useFindAndModify", false);
