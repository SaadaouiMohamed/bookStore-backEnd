import express from 'express'
import { addBook, addCategory, createBookReview, displayBooks, displayDetails, displayReviews, uploadFile } from '../controllers/bookController.js'
import { protect } from '../controllers/protectController.js'
const bookRouter=express.Router()


bookRouter.route('/newBook').post(protect,addBook)
bookRouter.route('/upload').post(uploadFile)
bookRouter.route('/addCategory').post(addCategory)
bookRouter.route('/display').get(displayBooks)
bookRouter.route('/detail/:id').get(displayDetails) 
bookRouter.route('/:id/reviews').post(protect,createBookReview)
bookRouter.route('/displayReviews/:id').get(displayReviews)
export default bookRouter 