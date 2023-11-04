// Dependensies : 

require("dotenv").config(); // configuring environment variable, we are not using const as we need it only once for now
const express = require("express");
const mongoose = require("mongoose");  // initiating mongoose to connect to MongoDb



// Initialising database

const database = require("./Database/database");
const BookModel = require("./Database/book");
const AuthorModel = require("./Database/author");
const PublicationModel = require("./Database/publication");


const { get } = require("https");
var bodyParser = require("body-Parser"); /* we use body parse so that it can parse data and can be read by express and system 
                                        and process the POST request*/    

// Initialising Express 
const Booky = express();

 
// Initialising body parser 
Booky.use(bodyParser.urlencoded({extended: true}));
Booky.use(bodyParser.json());


// Initialising Mongoose


/*
mongoose.connect("mongodb+srv://UserAlphaXXX:mongoDb1234@cluster0.k0owstl.mongodb.net/?retryWrites=true&w=majority").then( () => console.log("Connection established"));

(This is how we can connect to mongodb but as a sensitive info is shown here i.e password, we will use environment variables to connect mongo)
*/


// Initialising Mongoose using env variable

mongoose.connect(process.env.MONGO_URL).then( () => console.log("Connection Established"));





// We create a server with .listen at the end to run the program server.


/*-------------------GET --------------------*/

// Creating a port with GET

/*
Route        : "/"  (root route)
Description  :  Getting all the books 
methods      :  GET
parameters   : None
Access       : Public  
*/

// Normal way to GET api request
/*
Booky.get("/", (req, res) => {
    return res.json({books : database.books});
});
*/




//Using MongoDb :
Booky.get("/",async (req, res) => {
    const getAllBooks = await BookModel.find();     // find() is empty because we want to get whole book model
    return res.json(getAllBooks);

});




// '/' is a base or home page url

/*
Route        : "/is" 
Description  :  Getting a specific Book
methods      :  GET
parameters   : isbn
Access       : Public  
*/


/*
Booky.get("/is/:isbn", (req,res) => {
     const getSpecificBook = database.books.filter( (book) => book.isbn === req.params.isbn);
     if (getSpecificBook.length === 0) {
        return res.json({error : `No book found for ISBN : ${req.params.isbn}`});
     }
     return res.json({book: getSpecificBook});

});
*/ 

Booky.get("/is/:isbn",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({isbn: req.params.isbn}); //findOne() is being used as find() fetches multiple result
   
    //null  0! = 1, 1! = 0   (negation property) We're using not ! as we cant apply logic to mongo
    if (!getSpecificBook) {
       return res.json({error : `No book found for ISBN : ${req.params.isbn}`});
    }
    return res.json({book: getSpecificBook});

});



/*
Route        : "/c" 
Description  :  Getting a specific Book by category
methods      :  GET
parameters   : category
Access       : Public  
*/

/*Booky.get("/c/:category", (requ,resu) => {
const getSpecificBook = database.books.filter( 
    (book) => book.category.includes(requ.params.category))

if (getSpecificBook.length === 0) {
    return resu.json({error : `There is no books for catergory of ${req.params.category}`});
}

    return resu.json({book:getSpecificBook});
});*/

Booky.get("/c/:category", async (req,res) => {
    const getSpecificBook = await BookModel.findOne({category: req.params.category}); //findOne() is being used as find() fetches multiple result
   
    //null  0! = 1, 1! = 0   (negation property) We're using not ! as we cant apply logic to mongo
    if (!getSpecificBook) {
       return res.json({error : `No book found for category of ${req.params.category}`});
    }
    return res.json(getSpecificBook);

});




/*
Route        : "/lang" 
Description  :  Getting a specific Book by language
methods      :  GET
parameters   :  language
Access       : Public  
*/

/*
Booky.get("/lang/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language) )

        if (getSpecificBook.length === 0) {
            return res.json({error : `No Book found with the language : ${req.params.language}`});
        }
        return res.json({book : getSpecificBook});
});
*/
Booky.get("/lang/:language",async (req,res) => {
    const getSpecificBook = await BookModel.findOne({language : req.params.language});

        if (!getSpecificBook) {
            return res.json({error : `No Book found with the language : ${req.params.language}`});
        }
        return res.json({book : getSpecificBook});
});


/*
Route        : "/author" 
Description  :  Getting all the authors
methods      :  GET
parameters   : None
Access       : Public  
*/

// using mongodb method
Booky.get("/author",async (req,res) =>{
    const getAllAuthors = await AuthorModel.find();
    return res.json(getAllAuthors);
});




/*
Route        : "/author"
Description  :  Getting specific author
methods      :  GET
parameters   : id
Access       : Public  
*/ 

/*
Booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter( 
        (author) => author.id === parseInt(req.params.id))  // parseInt is used to convert string input into integer input.

        if (getSpecificAuthor.length === 0) {
            return res.json({error : `No authors found with the id : ${req.params.id}`});
        }
        return res.json({author : getSpecificAuthor});
})
*/

// Mongo way :

Booky.get("/author/:id", async (req,res) =>{
    const getAuthorById = await AuthorModel.findOne({id : req.params.id});

      if(!getAuthorById) {
    return res.json({error : `No author found by id ${req.params.id}`});
      }
      return res.json(getAuthorById);
}
);



/*
Route        : "/author/book" 
Description  :  Getting specific author by isbn (book)
methods      :  GET
parameters   : isbn
Access       : Public  
*/ 

/*
Booky.get("/author/book/:isbn", (req,res)=> {
   const getSpecificAuthor = database.author.filter( 
   (author) => author.books.includes(req.params.isbn)
   )
   if (getSpecificAuthor.length === 0) {
    return res.json({error : `The author for book ${req.params.isbn} does not exists`});
   }

   return res.json({author : getSpecificAuthor});
   });
   */

   Booky.get("/author/book/:isbn", async (req,res) =>{
    const getAuthorByIsbn = await AuthorModel.findOne({isbn : req.params.isbn});
      
    if(!getAuthorByIsbn){
        return res.json({error : `The Author for book ${req.params.isbn}`});
    }
     return res.json(getAuthorByIsbn);
   });




   /*
Route        : "/publish" 
Description  :  Getting all the publishers
methods      :  GET
parameters   : none
Access       : Public  
*/ 
 


// Normal way

/*
Booky.get("/publish", (req,res) => {
      return res.json({publication : database.publication})
});
*/

// Through Mongo 

Booky.get("/publish",async (req,res) => {
    const getAllPublications = await PublicationModel.find();

    return res.json(getAllPublications);
});



   /*
Route        : "/publish" 
Description  :  Getting a specific publisher
methods      :  GET
parameters   : id
Access       : Public  
*/ 

Booky.get("/publish/:id", (req,res) => {
    const getSpecificPublisher = database.publication.filter(
        (publication) => publication.id === parseInt(req.params.id) )

        if (getSpecificPublisher.length === 0) {
            return res.json({error : `No publisher found with the id  : ${req.params.id}`});
        }
        return res.json({publication : getSpecificPublisher});
})



   /*
Route        : "/publish" 
Description  :  Getting a specific publisher
methods      :  GET
parameters   : isbn
Access       : Public  
*/ 
 
Booky.get("/publish/book/:isbn", (req,res) => {
    getSpecificPublisher = database.publication.filter(
        (publication) => publication.books.includes(req.params.isbn))

        if(getSpecificPublisher.length === 0) {
            return res.json({error : `No publication for the book : ${req.params.isbn}`});
        }
            return res.json({publication : getSpecificPublisher});
})





/*------------------------------------------POST------------------------------------------------*/


 /*  Using POST method to update data to the database 
Route        : "/book/new" 
Description  :  Adding a new book to the database
methods      :  POST
parameters   :  none
Access       : Public  
*/ 

/* Normal Method :
  Booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks : database.books});
  });
  */
 
  // Push is used here to push the converted json data into the database records  
  /* In order to use POST request, enter the complete URL into postman i.e http://localhost:3000/book/new 
     and then enter new data to be sent in json format and click send
     in json format both key and value pairs are in double quotes 
   */

     // using Mongo : 

     Booky.post("/book/new",async (req, res) => {   
        const {newBook} = req.body;      //here destructuring is used to extract data that will be passed in the object format
        const updatedBooks = BookModel.create(newBook);
        return res.json({
            books : updatedBooks,
            message : "Book was added !!"
        });
      });

    // We are not expecting to fetch any data that's why await is not needed
    // We will need to put "" in all key value pairs as json format has both "key" and "value" under ""

  
 /*  Using POST method to update data to the database 
Route        : "/author/new" 
Description  :  Adding a new author to the database
methods      :  POST
parameters   :  none
Access       : Public  
*/

Booky.post("/author/new",async (req,res) =>{
    const {newAuthor} = req.body;
    const addNewAuthor = AuthorModel.create(newAuthor);
    return res.json(
        {author : addNewAuthor,
        message : "Author was added"});
    
});



/*  Using POST method to Add data to the database 
Route        : "/publish/new" 
Description  :  Adding a new publisher to the database
methods      :  POST
parameters   :  none
Access       : Public  
*/
Booky.post("/publish/new",(req, res)=>{
    const newPublisher = req.body;
    database.publication.push(newPublisher);
    return res.json({publication : database.publication});
})
     


/*----------------------------------------------------------PUT-----------------------------------------------------*/


/*  Using PUT method to update data to the database 
Route        : "/publish/update/book/:isbn" 
Description  :  Adding a new publisher to the database
methods      :  PUT 
parameters   :  isbn
Access       : Public  
*/


Booky.put("/publication/update/book/:isbn", (req,res) => {

    //Updating publications database
          database.publication.forEach(         // forEach loop is used because we don't need any return value here
             (pub) => {
                if(pub.id === req.body.pubId) {
                    return pub.books.push(req.params.isbn);
                }
             });
   
     //Updating Books records database

         database.books.forEach(
            (book) => {
                if (book.isbn === req.params.isbn) {
                    book.publication = body.pubId;
                    return;
                }
                
                });
                return res.json ({
                    publication : database.publication,
                    books : database.books,
                    message : "Succesfully updated" 
            }
         );
});

// Using Mongo to update data 
/*
Route        : "/book/update/:isbn" 
Description  :  updating a book title 
methods      :  PUT 
parameters   :  isbn
Access       : Public
*/

Booky.put("/book/update/:isbn", async(req,res) => {
     const updatedBook =await BookModel.findOneAndUpdate(
        {
            isbn : req.params.isbn     // First parameter to find which book to be updated
        },
        {
            title : req.body.bookTitle   // Second parameter to pass the body that needs to be updated
        },
        {
            new : true               // To show updated database on the frontend i.e postman etc.
        }
     );
     return res.json({
        books : updatedBook
     });
});


/*
Route        : "/book/author/update/:isbn" 
Description  :  updating author in books and book in the respective author
methods      :  PUT 
parameters   :  isbn and id
Access       : Public
*/

   Booky.put("/book/author/update/:isbn", async(req,res) =>{
    
    // Updating Books database

    const UpdatedBook =await BookModel.findOneAndUpdate(
        {
            isbn : req.params.isbn            // parameter to find which book's author to be updated
        },
        {
            $addToSet : {
                author : req.body.newAuthor     // Adding new author to book matched with input isbn
            }
        },
        {
            new : true
        }
    );

    // Updating Author database

    const UpdatedAuthor =await AuthorModel.findOneAndUpdate(
        {
           id : req.body.newAuthor
        },
        {
            $addToSet : {
                  books : req.params.isbn
            }
        },
        {
            new : true
        }
    );

    return res.json({
        books : UpdatedBook,
        author : UpdatedAuthor,
        message : "Author was updated succesfully !"
    })
   });

/*-----------------------------------------------DELETE REQUEST ------------------------------------------------------- */

/*  Using DELETE method to update data to the database 
Route        : "/book/Delete/:isbn" 
Description  :  Deleting a book
methods      :  DELETE
parameters   :  isbn
Access       : Public  
*/
/*
Booky.delete("/book/Delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter( 
        (book) => book.isbn !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    return res.json({books : database.books});
});*/




// Using delete using mongo 


Booky.delete("/book/Delete/:isbn",async (req,res) => {
    const updatedBookDatabase =await BookModel.findOneAndDelete(
        {
            isbn : req.params.isbn
        }
    );
    return res.json({books : updatedBookDatabase});
});

/*  Using PUT method to update data to the database 
Route        : "/book/Delete/:isbn" 
Description  :  Deleting Author from Book
methods      :  DELETE
parameters   :  isbn
Access       : Public  
*/

Booky.delete("/book/Delete/author/:isbn/:authorId", (req, res) => {

    // Update Books Database 
    database.books.forEach( (book) => {
       if (book.isbn === req.params.isbn) {
        const newAuthorList = book.author.filter(
            (eachAuthor) => eachAuthor !== parseInt(req.params.authorId)
        );
        book.author = newAuthorList;
        return;
       }
    });
 
    // Update Author database
    database.author.forEach(
         (eachAuthor) => {
            if (eachAuthor.id === parseInt(req.params.authorId)) {
                const newBookList = eachAuthor.books.filter( 
                    (book) => book !== req.params.isbn
                     );
                     eachAuthor.books = newBookList;
                     return;
                }
         
                });
     return res.json({
        book : database.books,
        author : database.author,
        message : "Success"
     });
    });




// Creating a server

Booky.listen(3000, () => {
    console.log("Server is up and Running");
});