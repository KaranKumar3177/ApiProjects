//Book Dataset
const books =
[
  {
    id: 1,
    title: "To Kill a Mockingbird",
    isbn: "123456789",
    language : "en",
    numPage : 250,
    author: [1,2],
    publication: [1],
    category : ["tech","space","Education"]
  },
  {
    id: 2,
    title: "1984",
    language : "en, esp, hin",
    isbn: "9780451524935",
    author: [2],
    publication: [2],
    category : ["tech","space"]
  },
  {
    id: 3,
    title: "The Great Gatsby",
    language : "en , jap",
    isbn: "9780743273565",
    author: 3,
    publication: [3],
    category : ["tech"]
  },

]


const author =

[
  {
    id: 1,
    name: "Harper Lee",
    books : ["123456"]
  },
  {
    id: 2,
    name: "George Orwell",
    books : ["9780451524935"]
  },
  {
    id: 3,
    name: "F. Scott Fitzgerald",
    books : ["9780743273565"]
  },
 
]


const publication =

[
  {
    id: 1,
    name: "HarperCollins Publishers",
    books : ["123456"]
  },
  {
    id: 2,
    name: "Signet Classics",
    books : []
  },
  {
    id: 3,
    name: "Scribner",
    books : ["9780743273565"]
  },
  {
    id: 4 ,
    name: "Randomm",
    books : ["464654"]
  }

]

module.exports= {books, author, publication};
