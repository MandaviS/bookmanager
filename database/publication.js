const mongoose = require("mongoose");

const PublicationSchema = mongoose.Schema({        //creating a book schema
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

const PublicationModel = mongoose.model("publications",PublicationSchema);   //creating a model

module.exports = PublicationModel;