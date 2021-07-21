const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({        //creating a book schema
    id: Number,
    name: String,
    books: [String],
});

const PublicationModel = mongoose.model("publications",PublicationSchema);   //creating a model

module.exports = PublicationModel;