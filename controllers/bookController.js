import asyncHandler from 'express-async-handler'
import multer from 'multer'
import Book from '../models/book.js'
import User from '../models/user.js'
import Category from '../models/category.js'
import path from 'path'




/************************* functions *********************/

/***************************** uploadFile *******************/
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"books")
    },
    filename:function(req,file,cb){
        cb(null,Date.now() +"-"+ file.originalname)
    }
});

const upload=multer({storage:storage}).single("file")

const uploadFile=asyncHandler(async(req,res)=>{
    upload(req,res,(err)=>{
        if(err){
            res.sendStatus(500)
        }
        res.send(req.file)
    })
})


/*************************** addBook ***********************/

const addBook = asyncHandler(async(req,res)=>{
    const book =new Book({
        name:req.body.name,
        price:req.body.price,
        author:req.body.author,
        category:req.body.category,
        description:req.body.description,
        InStock:req.body.InStock,
        image:req.body.image,
        sold:req.body.sold
    })
    book.save()
    res.json("test")
})
  

/************************** add category ***********************/

const addCategory=asyncHandler(async(req,res)=>{
    const addcategory=new Category({
        category:req.body.category,
        
    })
     addcategory.save() 
    
    res.json("category")
})

/******************** display *************************/

const displayBooks = asyncHandler(async(req,res)=>{
    const book= await Book.find().populate('category')
    const categ=await Category.find()
    res.json({book:book,categ:categ}) 
})
 


/******************** details ***********************/

const displayDetails=asyncHandler(async(req,res)=>{
    const book=await Book.findById(req.params.id).populate()
    
    res.json({book:book})
})



/********************* add reviews ******************/

const createBookReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const book = await Book.findById(req.params.id);
  
    if (book) {
      const alreadyReviewed = book.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("book already reviewed");
      }
      console.log(req.user.name)
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
         user: req.user._id,
      };
  
      book.reviews.push(review);
  
       book.numReviews = book.reviews.length;
  console.log(review.name);
      book.rating =
       Number(book.reviews.reduce((acc, item) => item.rating + acc, 0) /
        book.reviews.length);
  
      await book.save();
      console.log(book.rating);
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("book not found");
    }
  })



/*************************** display reviews ****************************/


const displayReviews=asyncHandler(async(req,res)=>{
    const book=await Book.findOne({reviews:req.params.id}).populate()
    const user=await User.find()
    res.json({book:book,user:user})
})


export {addBook,displayBooks,uploadFile,displayDetails,createBookReview,displayReviews,addCategory}