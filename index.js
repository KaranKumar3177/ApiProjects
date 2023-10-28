const express = require("express");

// Initialising database

const database = require("./database");
const { get } = require("https");
var bodyParser = require("body-Parser"); /* we use body parse so that it can parse data and can be read by express and system 
                                        and process the POST request*/    

// Initialising Express 
const Booky = express();
 
// Initialising body parser 
Booky.use(bodyParser.urlencoded({extended: true}));
Booky.use(bodyParser.json());

// We create a server with .lisnten at the end to run the program server 


// Creating a port with GET

/*
Route        : "/"  (root route)
Description  :  Getting all the books 
methods      :  GET
parameters   : None
Access       : Public  
*/

Booky.get("/", (req, res) => {
    return res.json({books : database.books});
});

// '/' is a base or home page url


/*
Route        : "/is" 
Description  :  Getting a specific Book
methods      :  GET
parameters   : isbn
Access       : Public  
*/

Booky.get("/is/:isbn", (req,res) => {
     const getSpecificBook = database.books.filter( (book) => book.isbn === req.params.isbn);
     if (getSpecificBook.length === 0) {
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

Booky.get("/c/:category", (requ,resu) => {
const getSpecificBook = database.books.filter( 
    (book) => book.category.includes(requ.params.category))

if (getSpecificBook.length === 0) {
    return resu.json({error : `There is no books for catergory of ${req.params.category}`});
}

    return resu.json({book:getSpecificBook});
});



/*
Route        : "/lang" 
Description  :  Getting a specific Book by language
methods      :  GET
parameters   :  language
Access       : Public  
*/

Booky.get("/lang/:language", (req,res) => {
    const getSpecificBook = database.books.filter(
        (book) => book.language.includes(req.params.language) )

        if (getSpecificBook.length === 0) {
            return res.json({error : `No Book found with the language : ${req.params.language}`});
        }
        return res.json({book : getSpecificBook});
}

)



/*
Route        : "/author" 
Description  :  Getting all the authors
methods      :  GET
parameters   : None
Access       : Public  
*/

Booky.get("/author",(req,res) =>{
    return res.json({author : database.author});
});




/*
Route        : "/author"
Description  :  Getting specific author
methods      :  GET
parameters   : id
Access       : Public  
*/ 

Booky.get("/author/:id", (req, res) => {
    const getSpecificAuthor = database.author.filter( 
        (author) => author.id === parseInt(req.params.id))  // parseInt is used to convert string input into integer input.

        if (getSpecificAuthor.length === 0) {
            return res.json({error : `No authors found with the id : ${req.params.id}`});
        }
        return res.json({author : getSpecificAuthor});
})



/*
Route        : "/author/book" 
Description  :  Getting specific author by isbn (book)
methods      :  GET
parameters   : isbn
Access       : Public  
*/ 

Booky.get("/author/book/:isbn", (req,res)=> {
   const getSpecificAuthor = database.author.filter( 
   (author) => author.books.includes(req.params.isbn)
   )
   if (getSpecificAuthor.length === 0) {
    return res.json({error : `The author for book ${req.params.isbn} does not exists`});
   }

   return res.json({author : getSpecificAuthor});
   });




   /*
Route        : "/publish" 
Description  :  Getting all the publishers
methods      :  GET
parameters   : none
Access       : Public  
*/ 
 
Booky.get("/publish", (req,res) => {
      return res.json({publication : database.publication})
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





 /*  Using POST method to update data to the database 
Route        : "/book/new" 
Description  :  Adding a new book to the database
methods      :  POST
parameters   :  none
Access       : Public  
*/ 
  Booky.post("/book/new", (req, res) => {
    const newBook = req.body;
    database.books.push(newBook);
    return res.json({updatedBooks : database.books});
  });
 
  // Push is used here to push the converted json data into the database records  
  /* In order to use POST request, enter the complete URL into postman i.e http://localhost:3000/book/new 
     and then enter new data to be sent in json format and click send
     in json format both key and value pairs are in double quotes 
   */

  
 /*  Using POST method to update data to the database 
Route        : "/author/new" 
Description  :  Adding a new author to the database
methods      :  POST
parameters   :  none
Access       : Public  
*/

Booky.post("/author/new", (req,res) =>{
    const newAuthor = req.body;
    database.author.push(newAuthor);
    return res.json({author : database.author});
    
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
     


/*  Using PUT method to update data to the database 
Route        : "/publish/update/book/:isbn" 
Description  :  Adding a new publisher to the database
methods      :  PUT 
parameters   :  none
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


/******DELETE REQUEST ***********  */

/*  Using PUT method to update data to the database 
Route        : "/book/Delete/:isbn" 
Description  :  Deleting a book
methods      :  DELETE
parameters   :  isbn
Access       : Public  
*/

Booky.delete("/book/Delete/:isbn", (req,res) => {
    const updatedBookDatabase = database.books.filter( 
        (book) => book.isbn !== req.params.isbn
    )
    database.books = updatedBookDatabase;
    return res.json({books : database.books});
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