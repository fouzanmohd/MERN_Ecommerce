const express = require("express");
const env = require("dotenv");
const app = express();
const mongoose = require("mongoose");

//Routes
const authRouter = require("./routes/auth");
const adminRouter = require("./routes/admin/auth");
const categoryRoute = require("./routes/category");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const path = require('path')
//Environment variable
env.config();

//mongodb connection

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.tqxgi.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, }
  )
  .then(() => console.log("Database connected successfully"));

app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use("/api", authRouter);
app.use("/api", adminRouter);
app.use("/api", categoryRoute);
app.use("/api", productRoute);
app.use("/api", cartRoute);

app.listen(process.env.PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
