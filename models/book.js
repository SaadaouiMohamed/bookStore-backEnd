import mongoose from 'mongoose'


const reviewSchema = mongoose.Schema(
    {
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
      },
    },
  )


const bookSchema = mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
        },
        author:{
            type:String,
            required:true,
        },
        price:{
            type:Number,
            required:true,
            default:0,
        },
        sold:{
            type:Number,
            required:true,
            default:0,
        },
        description:{
            type:String,
            required:true,
        },
        // category:{
        //     type:String,
        //     required:true,
        // },
        image:{
            type:String,
            required:true,
        },
        InStock:{
            type:Number,
            required:true,
            default:0,
        },
        reviews:[reviewSchema], 
        rating:{
            type:Number,
            required:true,
            default:0,
        },
        numReviews: {
            type: Number,
            required: true,
            default: 0,
          },
          category:{
            type:mongoose.Schema.Types.ObjectId,
            required:false,
            ref:"Category",
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,  
            required: false,
            ref: 'User',
          },
    } 
)



const Book = mongoose.model('Book',bookSchema)

export default Book