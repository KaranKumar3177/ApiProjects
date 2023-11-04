// First import mongoose
const mongoose = require("mongoose");
// Then make Schema
const authorSchema = mongoose.Schema(

    
        {
            id: Number,
            name: String,
            books : [String]
          }
      
);

// Then make Model which will include name of database in mongo "authors" and Schema name "authorSchema"
const AuthorModel = mongoose.model("authors",authorSchema);
// export the module
module.exports = AuthorModel;