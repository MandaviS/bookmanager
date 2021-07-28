// prefix: /publication
const Router = require("express").Router();

const PublicationModel = require("../../database/publication");
 
 /*
 route           /publication
 description   get all publications
 access        PUBLIC
 parameters    none
 method        GET
*/

Router.get("/",async(req,res) =>{ try {
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
  
  Router.get("/:id",async(req,res) => {
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
  Router.get("/is/:isbn",async(req,res) =>{
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
   route           /publication/new/newPub
   description   add new publication
   access        PUBLIC
   parameters    none
   method        POST
  */ 
  
  Router.post("/new/newPub",(req,res) =>{
    const { newPublication } = req.body;
    PublicationModel.create(newPublication);        
    //database.publications.push(newPublication);
    return res.json({message: "publication was added"});
  });
  
    /*
   route           /publication/book/update
   description    update/add new book to a publication
   access        PUBLIC
   parameters    isbn
   method        PUT
  */ 
  
  Router.put("/book/update/:isbn",async(req,res) =>{
    //publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: req.body.pubID,
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
    //book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $set: {
       publication: req.body.pubID,
        },
      },
      {
        new: true,
      },
    );
    // database.publications.forEach((publication) => {                   //updating publication database
    //   if(publication.id === req.body.pubID){
    //     return publication.books.push(req.params.isbn);
    //   }
    // });
    // database.books.forEach((book) => {              //updationg book database
    //   if(book.ISBN === req.params.isbn){
    //   book.publication = req.body.pubID;
    //   return;
    //   }
    // });
    return res.json({ publication: updatedPublication, books: updatedBook, message: "successfully updated publication"});
    });
    
  
                      
    
      
  
   /*
   route           /publication/book/delete
   description    delete a book from publication
   access        PUBLIC
   parameters    isbn , publication id
   method        DELETE
  */ 
  
  Router.delete("/book/delete/:isbn/:pubID",async(req,res) =>{
    //publication database
    const updatedPublication = await PublicationModel.findOneAndUpdate(
      {
        id: parseInt(req.params.pubID),
      },
      {
        $pull:
        {
          books: req.params.isbn,
        },
      },
      {
        new: true,
      }
    );
    //book database
    const updatedBook = await BookModel.findOneAndUpdate(
      {
        ISBN: req.params.isbn,
      },
      {
        $unset: {
          publication: parseInt(req.params.pubID),
        },
      },
      {
        new: true,
      }
    );
    // database.publications.forEach((publication)=>{
    //   if(publication.id === parseInt(req.params.pubID)){    //updating publication database
    //     const newBooksList = publication.books.filter(
    //       (book)=> book !== req.params.isbn
    //     );
    //     publication.books = newBooksList;
    //     return;
    //   }
    //  });
    // database.books.forEach((book)=>{
    //  if(book.ISBN === req.params.isbn){                    //updating book database
    //    book.publication = 0; //No publication available
    //    return;
    //  }
    // });
  
    return res.json({books: updatedBook, publications: updatedPublication});    
      });                    
        
      /*
   route           /publication/delete
   description    delete a publication
   access        PUBLIC
   parameters    id
   method        DELETE
  */ 
  
  Router.delete("/delete/:id",async(req,res) =>{
    const updatedPublication = await PublicationModel.findOneAndDelete(
      {
        id: parseInt(req.params.id),
      }
    );
    // const updatedPublicationDatabase = database.publications.filter((publication) =>
    // publication.id !== parseInt(req.params.id)
    // );
    // database.publications= updatedPublicationDatabase;
    return res.json({publications: updatedPublication });    
      });

    module.exports = Router;    