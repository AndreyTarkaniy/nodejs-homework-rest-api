import mongoose from "mongoose";
import dotenv from "dotenv";

import app from "./app.js";

// NcBe0ZanzWeBGSpE

dotenv.config();

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Database connection successful. Use our API on port: ${PORT}`);
    });
  })
  .catch(error => console.log(error.message));
