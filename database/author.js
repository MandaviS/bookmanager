const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({        //creating a book schema
    id: Number,
    name: String,
    books: [String],
});

const AuthorModel = mongoose.model(AuthorSchema);   //creating a model

module.exports = AuthorModel;