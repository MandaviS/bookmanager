const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({        //creating a book schema
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    pubDate: Number,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

const BookModel = mongoose.model("books",BookSchema);   //creating a model

module.exports = BookModel;