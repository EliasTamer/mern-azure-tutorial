require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require('path');
const app = express();

const mongoose = require("mongoose");
const port = process.env.PORT || 3001;


const authRoutes = require("./routes/auth");
const categoryRoutes = require("./routes/categories");
const productRoutes = require("./routes/products");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database is connected..."))
  .catch((err) => console.log(err));

  app.use('/images', express.static(path.join(__dirname, 'images')));


  app.use("/auth", authRoutes);
  app.use("/categories", categoryRoutes);
  app.use("/products", productRoutes);
  
  // to handle the thrown errors in my controllers
  app.use((error, req, res, next) => {
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
  
    res.status(status).json({
      message: message,
      data: data,
    });
  });

app.use(express.static("./client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
})

app.listen(port, () => {
  console.log(`Server is running on post ${port}`);
});
