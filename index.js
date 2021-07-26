require("dotenv").config();  //for security purpose
const express = require("express");
const mongoose = require("mongoose");
//Database
const database = require("./database/index");
//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");  

const Aranda = express();

Aranda.use(express.json());

//establishing database connection
mongoose.connect(
  process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }
).then(() => console.log("connection established!!"));



/*
 route           /
 description   get all books
 access        PUBLIC
 parameters    none
 method        GET
*/

Aranda.get("/",async (req,res) => {
  const getAllBooks = await BookModel.find();
  return res.json({getAllBooks});
});

/*
 route           /
 description   get specific book based on isbn
 access        PUBLIC
 parameters    isbn
 method        GET
*/

Aranda.get("/is/:isbn",async(req,res) => {
const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn}); //only one book can have an isbn
// const getSpecificBook = database.books.filter(
//   (book) => book.ISBN === req.params.isbn
//     );
if(!getSpecificBook){
    return res.json({
      error: `No book found for the ISBN of ${req.params.isbn}`,
    });
}  
 
 return res.json({ book: getSpecificBook });
});

/*
 route          /c
 description   get specific books based on a category
 access        PUBLIC
 parameters    category
 method        GET
*/

Aranda.get("/c/:category",async(req,res) => {
  const getSpecificBooks = await BookModel.findOne({category: req.params.category,});
    // const getSpecificBooks = database.books.filter(
    //     (book) => book.category.includes(req.params.category)     // boolean result
    //     );
    if(!getSpecificBooks){
        return res.json({
          error: `No book found for the category of ${req.params.category}`,
        });
    }  
     
     return res.json({ book: getSpecificBooks });
    });

/*
 route          /a
 description   get specific books based on author
 access        PUBLIC
 parameters    author
 method        GET
*/

 Aranda.get("/a/:author",async(req,res) =>{
  //  const  getAuthor = database.authors.filter(x => x.name === req.params.author);
  //  const getAuthorId = getAuthor.map(s => s.id);
  //  const m = getAuthorId.toString();
  //  const getSpecificBooks = database.books.filter(
  //    (book) => 
  //      book.authors.includes(parseInt(m)) 
  //    );
  const getSpecificBooks = await BookModel.findOne({authors: req.params.author});
     if(!getSpecificBooks){
       return res.json({
         error: `No book found for the category of ${req.params.author}`,
       });
   }  
   return res.json({ book: getSpecificBooks });
  });



  /*
 route           /author
 description   get all authors
 access        PUBLIC
 parameters    none
 method        GET
*/

Aranda.get("/author",async(req,res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json({ authors: getAllAuthors});
});

/*
 route           /author
 description   get specific author based on id
 access        PUBLIC
 parameters    id
 method        GET
*/

Aranda.get("/author/:id",async(req,res) => {
  const getSpecificAuthor = await AuthorModel.findOne({id: req.params.id});
  // const getSpecificAuthor = database.authors.filter(
  //   (author) => author.id.toString() === req.params.id
  //   );
if(!getSpecificAuthor){
    return res.json({
      error: `No author found for the id of ${req.params.id}`,
    });
}  
 
 return res.json({ author: getSpecificAuthor });
});



/*
 route           /author
 description   get authors based on a book's ISBN
 access        PUBLIC
 parameters    ISBN
 method        GET
*/ 
Aranda.get("/author/book/:isbn",async(req,res) =>{
  const getSpecificAuthors = await AuthorModel.findOne({books: req.params.isbn});
//  const getSpecificAuthors = database.authors.filter((author) =>
//  author.books.includes(req.params.isbn)
//  );
 if(!getSpecificAuthors){
  return res.json({
    error: `No author found for the book ${req.params.isbn}`,
  });
}  

return res.json({ authors : getSpecificAuthors });
});

  /*
 route           /publication
 description   get all publications
 access        PUBLIC
 parameters    none
 method        GET
*/

Aranda.get("/publication",async(req,res) =>{ try {
  const getAllPublications = await PublicationModel.find();
  return res.json({ publications: getAllPublications});
}
catch (error) {
  return res.json({ error: error.message });
}});

/*
 route           /publication
 description   get specific publications based on id
 access        PUBLIC
 parameters    id
 method        GET
*/

Aranda.get("/publication/:id",async(req,res) => {
  const getSpecificPublications = await PublicationModel.findOne({id: req.params.id});
  // const getSpecificPublications = database.publications.filter(
  //   (publication) => publication.id.toString() === req.params.id
  //   );
// if(getSpecificPublications.length === 0)
    if(!getSpecificPublications){
    return res.json({
      error: `No publication found for the id of ${req.params.id}`,
    });
}  
 
 return res.json({ publications: getSpecificPublications });
});

/*
 route           /publication
 description   get publications based on a book's ISBN
 access        PUBLIC
 parameters    ISBN
 method        GET
*/ 
Aranda.get("/publication/is/:isbn",async(req,res) =>{
  const getSpecificPublications = await PublicationModel.findOne({books: req.params.isbn});
  // const getSpecificPublications = database.publications.filter((publication) =>
  // publication.books.includes(req.params.isbn)
  // );
  // if(getSpecificPublications.length === 0)
  if(!getSpecificPublications){
   return res.json({
     error: `No publication found for the book ${req.params.isbn}`,
   });
 }  
 return res.json({ publications : getSpecificPublications });
 });

 /*
 route           /book/new
 description   add new books
 access        PUBLIC
 parameters    none
 method        POST
*/ 

Aranda.post("/book/new", async (req,res) =>{
    const { newBook } = req.body;
    const addNewBook = BookModel.create(newBook);
    //database.books.push(newBook);
    return res.json({books: addNewBook, message: "book was added"});
  });

/*
 route           /author/new
 description   add new author
 access        PUBLIC
 parameters    none
 method        POST
*/ 

Aranda.post("/author/new/newAuthor",(req,res) =>{
  const { newAuthor } = req.body;
  AuthorModel.create(newAuthor);      
  //database.authors.push(newAuthor);
  return res.json({message: "author was added"});
});

/*
 route           /publication/new/newPub
 description   add new publication
 access        PUBLIC
 parameters    none
 method        POST
*/ 

Aranda.post("/publication/new/newPub",(req,res) =>{
  const { newPublication } = req.body;
  PublicationModel.create(newPublication);        
  //database.publications.push(newPublication);
  return res.json({message: "publication was added"});
});

/*
 route           /book/update/:isbn
 description   update book title
 access        PUBLIC
 parameters    isbn
 method        PUT
*/ 

Aranda.put("/book/update/:isbn",async(req,res) =>{
  const updatedBook = await BookModel.findOneAndUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.body.bookTitle,
    },
    {
      new: true,
    }
  );
  // database.books.forEach((book) => {
  //   if(book.ISBN == req.params.isbn){
  //     book.title = req.body.bookTitle;
  //     return;
  //   }
  // });
  return res.json({ books: updatedBook});
  });

  /*
 route           /book/author/update/:isbn
 description   update/add new author
 access        PUBLIC
 parameters    isbn
 method        PUT
*/ 

Aranda.put("/book/author/update/:isbn",(req,res) =>{
  database.books.forEach((book) => {                   //updating book database
    if(book.ISBN == req.params.isbn){
      return book.authors.push(req.body.newAuthor);
    }
  });
  database.authors.forEach((author) => {              //updationg author database
    if(author.id == req.body.newAuthor){
      return author.books.push(req.params.isbn);
    }
  })
  return res.json({ books: database.books, authors: database.authors, message: "new author was added"});
  });

/*
 route           /author/update/:id
 description   update author name
 access        PUBLIC
 parameters    id
 method        PUT
*/ 

Aranda.put("/author/update/:id",(req,res) =>{
  database.authors.forEach((author) => {
    if(author.id == req.params.id){
      author.name = req.body.authorName;
      return;
    }
  });
  return res.json({ authors: database.authors});
  });  

   /*
 route           /publication/book/update
 description    update/add new book to a publication
 access        PUBLIC
 parameters    isbn
 method        PUT
*/ 

Aranda.put("/publication/book/update/:isbn",(req,res) =>{
  database.publications.forEach((publication) => {                   //updating publication database
    if(publication.id === req.body.pubID){
      return publication.books.push(req.params.isbn);
    }
  });
  database.books.forEach((book) => {              //updationg book database
    if(book.ISBN === req.params.isbn){
    book.publication = req.body.pubID;
    return;
    }
  })
  return res.json({ publications: database.publications, books: database.books, message: "successfully updated publication"});
  });
  
  /*
 route           /book/delete
 description    delete a book
 access        PUBLIC
 parameters    isbn
 method        DELETE
*/ 

Aranda.delete("/book/delete/:isbn",(req,res) =>{
const updatedBookDatabase = database.books.filter((book) =>
book.ISBN !== req.params.isbn
);

database.books= updatedBookDatabase;
return res.json({books: database.books });    //coz we're changing const to let in database as we're
  });                                         //replacing whole database with a new database

 /*
 route           /book/author/delete
 description    delete an author from a book
 access        PUBLIC
 parameters    isbn , author id
 method        DELETE
*/ 

Aranda.delete("/book/author/delete/:isbn/:authorID",(req,res) =>{
  database.books.forEach((book)=>{
   if(book.ISBN === req.params.isbn){
     const newAuthorList = book.authors.filter(
       (author)=> author !== parseInt(req.params.authorID)
     );
     book.authors = newAuthorList;
     return;
   }
  });
  database.authors.forEach((author)=>{
    if(author.id === parseInt(req.params.authorID)){
      const newBooksList = author.books.filter(
        (book)=> book !== req.params.isbn
      );
      author.books = newBooksList;
      return;
    }
   });
  return res.json({books: database.books, authors: database.authors,message:"author was deleted" });    
    });                    
  
   /*
 route           /author/delete
 description    delete an author
 access        PUBLIC
 parameters    id
 method        DELETE
*/ 

Aranda.delete("/author/delete/:id",(req,res) =>{
  const updatedAuthorDatabase = database.authors.filter((author) =>
  author.id !== parseInt(req.params.id)
  );
  database.authors= updatedAuthorDatabase;
  return res.json({authors: database.authors });    
    });             

 /*
 route           /publication/book/delete
 description    delete a book from publication
 access        PUBLIC
 parameters    isbn , publication id
 method        DELETE
*/ 

Aranda.delete("/publication/book/delete/:isbn/:pubID",(req,res) =>{
  database.publications.forEach((publication)=>{
    if(publication.id === parseInt(req.params.pubID)){    //updating publication database
      const newBooksList = publication.books.filter(
        (book)=> book !== req.params.isbn
      );
      publication.books = newBooksList;
      return;
    }
   });
  database.books.forEach((book)=>{
   if(book.ISBN === req.params.isbn){                    //updating book database
     book.publication = 0; //No publication available
     return;
   }
  });

  return res.json({books: database.books, publications: database.publications});    
    });                    
      
    /*
 route           /publication/delete
 description    delete a publication
 access        PUBLIC
 parameters    id
 method        DELETE
*/ 

Aranda.delete("/publication/delete/:id",(req,res) =>{
  const updatedPublicationDatabase = database.publications.filter((publication) =>
  publication.id !== parseInt(req.params.id)
  );
  database.publications= updatedPublicationDatabase;
  return res.json({publications: database.publications });    
    });    

Aranda.listen(3000, () => console.log("Server Running!!"));