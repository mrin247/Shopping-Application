// ! Install Dependecies
const express = require("express");
const env = require("dotenv");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

// ! Configure environment variables
env.config();

// ! Import Routes
const authRoute = require("./routes/auth");
const adminRoute = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

// ! MongoDb Connection
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.pwkc0.mongodb.net/${process.env.MONGO_DB_DBNAME}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    }
  )
  .then(() => {
    console.log(`
    Database is connected
*************************************`);
  });

// ! Use dependencies
const app = express();

// ! Middlewares
app.use(bodyParser());
app.use(cors());

// ! Static middleware
app.use("/public", express.static(path.join(__dirname, "uploads")));

// ! Middleware routes
app.use("/api", authRoute);
app.use("/api", adminRoute);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", cartRoutes);

//  ! Satrt Server
app.listen(process.env.PORT, () => {
  console.log(`*************************************
    Server is running on port ${process.env.PORT}`);
});
