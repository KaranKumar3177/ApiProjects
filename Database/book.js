  // First import mongoose
const mongoose = require("mongoose");
// Then make Schema
const bookSchema = mongoose.Schema(

    {
        id: Number,
        title: String,
        isbn: Number,
        language : String,
        numPage : Number,
        author: [Number],
        publication: [Number],
        category : [String]
      }
);

// Then make Model which will include name of database in mongo "Books" and Schema name "bookSchema"
const BookModel = mongoose.model("Books",bookSchema);
// export the module
module.exports = BookModel;