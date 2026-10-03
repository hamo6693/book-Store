require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes");
const routerBook = require("./routes/book");
const routerFavourite= require("./routes/favourite");
const routerCart= require("./routes/cart");
const routerOrder= require("./routes/order");
const path = require('path')
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();

const port = process.env.PORT;

//تحويل الطلب وارساله

app.use(cors());

//ظهور معلومات الطلب

app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//app.use("/static",express.static(path.join(__dirname + "public")))

/*
var assetsPath = path.join(__dirname, "./public/images");
app.use(express.static(assetsPath));
*/
//app.use(express.static('./public/images'));

app.use("*/images",express.static(__dirname + "/public/images"))

app.use("/", routerOrder);


app.use("/", routerCart);

app.use("/", routerFavourite);

app.use("/", routerBook);

app.use("/", router);

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));

app.listen(port, () => {
  console.log("connected on port: " + port);
});
