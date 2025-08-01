const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("../Backend/db/db");
const userRouter = require("../Backend/routes/user.route");
const noteRouter = require("./routes/note.route");

app.use(express.json());
app.use("/user", userRouter);
app.use("/note", noteRouter);

const port =6000;
app.listen(port, () => {
  connectDB('mongodb://127.0.0.1:27017/note');
  console.log("Server is running  :) on ", port);
});
