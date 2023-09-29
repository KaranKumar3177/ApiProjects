const express = require("express");

// Initialising database

const database = require("./database");
const { get } = require("https");

// Initialising Express 

const Booky = express();




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
        (author) => author.id === parseInt(req.params.id))

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





// Creating a server

Booky.listen(3000, () => {
    console.log("Server is up and Running");
});