 // prefix: /author
 const Router = require("express").Router();

 const AuthorModel = require("../../database/author");
 
 /*
 route           /author
 description   get all authors
 access        PUBLIC
 parameters    none
 method        GET
*/

Router.get("/",async(req,res) => {
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

Router.get("/:id",async(req,res) => {
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
Router.get("/book/:isbn",async(req,res) =>{
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
 route           /author/new
 description   add new author
 access        PUBLIC
 parameters    none
 method        POST
*/ 

Router.post("/new/newAuthor",async(req,res) =>{
  try{
    const { newAuthor } = req.body;
    await AuthorModel.create(newAuthor);      
    //database.authors.push(newAuthor);
    return res.json({message: "author was added"});
  } catch(error){
    return res.json({error: error.message});
  }  
  });
  
/*
 route           /author/update/:id
 description   update author name
 access        PUBLIC
 parameters    id
 method        PUT
*/ 

Router.put("/update/:id",async(req,res) =>{
try{
  const updatedAuthor = await AuthorModel.findOneAndUpdate(
    {
      id: parseInt(req.params.id),
    },
    {
      name: req.body.authorName,
    },
    {
      new: true,
    }
  );
  // database.authors.forEach((author) => {
  //   if(author.id == req.params.id){
  //     author.name = req.body.authorName;
  //     return;
  //   }
  // });
  return res.json({ authors: updatedAuthor});
} catch(error){
  return res.json({error: error.message});
}    
    }); 
    
 /*
 route           /author/delete
 description    delete an author
 access        PUBLIC
 parameters    id
 method        DELETE
*/ 

Router.delete("/delete/:id",async(req,res) =>{
    const updatedAuthorDatabase = await AuthorModel.findOneAndDelete(
      {
        id: parseInt(req.params.id),
      },
    );
    // const updatedAuthorDatabase = database.authors.filter((author) =>
    // author.id !== parseInt(req.params.id)
    // );
    // database.authors= updatedAuthorDatabase;
    return res.json({authors: updatedAuthorDatabase });    
      });               

module.exports = Router;       
