const express = require("express"); //imports express library
const mongoose = require("mongoose"); //imports mongoose(library for mongodb)

const bodyParser = require("body-parser"); //imports body-parser, helps parse incoming request bodies in middleware

//imports cors middleware (cross-origin resourse sharing)
//allows server to accept request from different domains
const cors = require("cors");
const postRoutes = require("./routes/posts");

const app = express(); //creates instance of express (used to manage and configure webserver & its routes)
const PORT = 5000; //port number on which server will run
const MONGO_URI = "mongodb://127.0.0.1:27017/blogapp"; //db url

// MongoDB connection (useNewUrlParser,useUnifiedTopology used to avoid deprecation warnings)
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

app.use(cors()); //uses cors middleware in express app
app.use(bodyParser.json()); //uses bodyparser to parse JSON request
app.use("/api/posts", postRoutes); // Routes

app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); //start the server