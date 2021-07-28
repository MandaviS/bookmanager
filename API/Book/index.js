//Prefix: /book
//Initialising express router
const Router = require("express").Router();

//database models
const BookModel = require("../../database/book");

/*
 route           /
 description   get all books
 access        PUBLIC
 parameters    none
 method        GET
*/

Router.get("/",async (req,res) => {
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

Router.get("/is/:isbn",async(req,res) => {
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

Router.get("/c/:category",async(req,res) => {
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

Router.get("/a/:author",async(req,res) =>{
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
 route           /book/new
 description   add new books
 access        PUBLIC
 parameters    none
 method        POST
*/ 

Router.post("/new", async (req,res) =>{
    const { newBook } = req.body;                                         //async await not necessary
    const addNewBook = BookModel.create(newBook);
    //database.books.push(newBook);
    return res.json({books: addNewBook, message: "book was added"});
  });
  
/*
 route           /book/update/:isbn
 description   update book title
 access        PUBLIC
 parameters    isbn
 method        PUT
*/ 

Router.put("/update/:isbn",async(req,res) =>{
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

Router.put("/author/update/:isbn",async(req,res) =>{
    //book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $push: {
          authors: req.body.newAuthor,
        },
      },
      {
        new: true,
      },
    );
    //author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate(
      {
        id: req.body.newAuthor,
      },
      {
        $push: {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      },
    );
    // database.books.forEach((book) => {                   //updating book database
    //   if(book.ISBN == req.params.isbn){
    //     return book.authors.push(req.body.newAuthor);
    //   }
    // });
    // database.authors.forEach((author) => {              //updationg author database
    //   if(author.id == req.body.newAuthor){
    //     return author.books.push(req.params.isbn);
    //   }
    // })
    return res.json({ books: updatedBook, authors: updatedAuthor, message: "new author was added"});
    });    

  /*
 route           /book/delete
 description    delete a book
 access        PUBLIC
 parameters    isbn
 method        DELETE
*/ 

Router.delete("/delete/:isbn",async(req,res) =>{
    const updatedBookDatabase = await BookModel.findOneAndDelete(
      {
        ISBN: req.params.isbn,
      },
    );
  // const updatedBookDatabase = database.books.filter((book) =>
  // book.ISBN !== req.params.isbn
  // );
  
  // database.books= updatedBookDatabase;
  return res.json({books: updatedBookDatabase });    //coz we're changing const to let in database as we're
    });                                         //replacing whole database with a new database

 /*
 route           /book/author/delete
 description    delete an author from a book
 access        PUBLIC
 parameters    isbn , author id
 method        DELETE
*/ 

Router.delete("/author/delete/:isbn/:authorID",async(req,res) =>{
    //book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $pull: {
         authors: parseInt(req.params.authorID),
        },
      },
      {
        new: true,
      }
    );
   //author database
   const updatedAuthor = await AuthorModel.findOneAndUpdate(
     {
       id: parseInt(req.params.authorID),
     },
     {
       $pull:{
       books: req.params.isbn,
       },
     },
     {
       new:true,
     },
   ); 
   // database.books.forEach((book)=>{
   //  if(book.ISBN === req.params.isbn){
   //    const newAuthorList = book.authors.filter(
   //      (author)=> author !== parseInt(req.params.authorID)
   //    );
   //    book.authors = newAuthorList;
   //    return;
   //  }
   // });
   // database.authors.forEach((author)=>{
   //   if(author.id === parseInt(req.params.authorID)){
   //     const newBooksList = author.books.filter(
   //       (book)=> book !== req.params.isbn
   //     );
   //     author.books = newBooksList;
   //     return;
   //   }
   //  });
   return res.json({books: updatedBook, authors: updatedAuthor,message:"author was deleted" });    
     });    
  
module.exports = Router;  