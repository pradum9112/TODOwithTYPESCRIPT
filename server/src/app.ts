import * as dotenv from "dotenv";
dotenv.config();
import express, { Express } from "express";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import todoRoutes from "./routes";
import bodyParser from "body-parser";

const app: Express = express();

const PORT: string | number = process.env.PORT || 4000;

app.use(bodyParser());
app.use(cors());
app.use(todoRoutes);

const uri: string = `${process.env.DATABASE}`;

const options = { useNewUrlParser: true, useUnifiedTopology: true };
mongoose.set("useFindAndModify", false);


// mongoDB connection
mongoose
  .connect(uri, options)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`DB connected and Server running on http://localhost:${PORT}`)
    )
  )
  .catch((error) => {
    throw error;
  });
