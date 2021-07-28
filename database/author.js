const mongoose = require("mongoose");

const AuthorSchema = mongoose.Schema({        //creating a book schema
    id: {
     type: Number,
     required: true,
    },
    name: {
     type: String,
     required: true,
     minlength: 6,
    },
    books: [String],
});

const AuthorModel = mongoose.model("authors",AuthorSchema);   //creating a model

module.exports = AuthorModel;