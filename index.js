require("dotenv").config();  //for security purpose
const express = require("express");
const mongoose = require("mongoose");

// //Database
// const database = require("./database/index");

// //Models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");  

//initialising micro services routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Author");

const Aranda = express();

Aranda.use(express.json());

//establishing database connection
mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(() => console.log("connection established!!"));

//initialising micro-services
Aranda.use("/book",Books);
Aranda.use("/author",Authors);
Aranda.use("/publication",Publications);


Aranda.listen(3000, () => console.log("Server Running!!"));