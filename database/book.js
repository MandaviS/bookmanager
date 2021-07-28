const mongoose = require("mongoose");

const BookSchema = mongoose.Schema({        //creating a book schema
    ISBN: {
        type:String,
        required: true,
        minlength: 8,
        maxlength: 10,   //validating schema so that no integrity is compromised(data integrity)
    },
    // ISBN: String, //required
    title: {
        type:String,
        required: true,
        minlength: 8,
        maxlength: 10,
    },
    authors: [Number],
    language: String,
    pubDate: String,
    numOfPage: Number,
    category: [String],
    publication: Number,
});

const BookModel = mongoose.model("books",BookSchema);   //creating a model

module.exports = BookModel;