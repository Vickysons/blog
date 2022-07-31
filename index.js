const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");

// routes description

const postRoute = require("./routes/Blog");
const userRoute = require("./routes/User");

// config

const app = express();
dotenv.config();

// middlewares

app.use(express.json());
app.use(cors());

// Db config

const mongo_url = process.env.Mongo_url;
mongoose.connect(mongo_url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// db connection
const db = mongoose.connection;

db.once("open", () => {
  console.log("connected to mongodb!!");
});

// port

port = process.env.PORT || 9000;

app.get("/", (req, res) => res.status(200).send("hello, how are you doing "));

// routes
app.use("/api", postRoute);
app.use("/api", userRoute);

// port listen

app.listen(port, console.log(`hey am connected to port: ${port}`));
