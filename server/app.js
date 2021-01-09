import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config.js";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

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