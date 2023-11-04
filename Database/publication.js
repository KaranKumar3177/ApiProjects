// First import mongoose
const mongoose = require("mongoose");
// Then make Schema  (instead of value a Schema contains the type of the value)
const publicationSchema = mongoose.Schema(

    
        {
            id: Number,
            name: String,
            books : [String]
          }
      
);

// Then make Model which will include name of database in mongo "publications" and Schema name "publicationSchema"
const PublicationModel = mongoose.model("publications",publicationSchema);
// export the module
module.exports = PublicationModel;