import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import "dotenv/config.js";

import users from "./routes/users.js";
import posts from "./routes/posts.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use("/users", users);
app.use("/posts", posts);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve(path.dirname(""));
  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"))
  );
}

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
