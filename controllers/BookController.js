import UserModel from '../models/UserSchema.js';
import BookModel from '../models/BookSchema.js';
import {uploadImage} from '../middlewares/cloudinary.js'
import mongoose from 'mongoose';

// Adding Book By User:

export const addBook = async(req,res,next)=>{
    try {
        const err= {}
        const userId=req.user.id.User._id
        console.log(userId,"kkk");
        const { bookName, price, genre,summary,image} = req.body.formData;
        const response = await uploadImage(image)
       console.log(response,"img");
        const book = new BookModel({
          UserId:userId,
            Name:bookName,
            Price:price,
            Genere:genre,
            Description:summary,
            Image:response
        });
console.log("seaved",book);
        await book.save();
        console.log("111");
        res.status(201).json({ message: 'Book Added successfully' });
       
      } catch (error) {
        next(error)
      }
}

export const getAllBook = async(req,res,next)=>{
    try {
        const books= await BookModel.find({})
        if(books.length){
            res.status(200).json({books});
        }
        else{
            res.status(200).json({message:"No Books Found"});
        }
      } catch (error) {
        next(error)
      }
}

export const getUserBook = async(req,res,next)=>{
    try {
      console.log("here");
        const userId=req.user.id.User._id
        const books= await BookModel.find({UserId:userId})
        console.log(books,"...");
        if(books.length){
            res.status(200).json({books});
        }
        else{
            res.status(200).json({message:"No Books Found"});
        }
      } catch (error) {
        next(error)
      }
}


export const ViewBook = async(req,res,next)=>{
  try {
      const userId=req.user.id.User._id
      console.log(req.query,userId);
      const {id} =req.query
      
      const ID = new mongoose.Types.ObjectId(id)
      const books= await BookModel.find({_id:ID})
      console.log(books,"here");
    
      res.status(200).json({books});
     
      
    } catch (error) {
    
      next(error)
    }
}


export const AddtoCart = async(req,res,next)=>{
  try {
      const userId=req.user.id.User._id
      console.log(req.body,userId);
      const {id} =req.body
      
      const ID = new mongoose.Types.ObjectId(userId)
      const BookId= new mongoose.Types.ObjectId(id)
      const books= await UserModel.findOneAndUpdate({_id:ID},{
        $addToSet:{Cart:BookId}
      },{new:true})
      console.log(books,"here");

    
      res.status(200).json({books});
     
      
    } catch (error) {
    
      next(error)
    }
}


export const getUserCart = async(req,res,next)=>{
  try {
    console.log("here");
      const userId=req.user.id.User._id
      const ID =new mongoose.Types.ObjectId(userId)
      // const user = await UserModel.findById(userId).populate("Cart.BookId");
      // console.log(user,"...");
      // if (!user) {
      //   return res.status(404).json({ message: "User not found" });
      // }
      // console.log(user.Cart); 
      // const books = user.Cart.map(item => item.BookId);
      // console.log("-=-=-=-=",books);
      // if(books.length){
      //     res.status(200).json({books});
      // }
      // else{
      //     res.status(200).json({message:"No Books Found"});
      // }
      await UserModel.aggregate([
        {
          $lookup: {
            from: 'Book',
            localField: 'Cart.BookId',
            foreignField: '_id',
            as: 'BookDetails'
          }
        },
        {
          $unwind: '$hosterDetails'
        },

        // {
        //   $match: {
        //     orderstatus: 'Completed',
        //     "hosterDetails.owner": new mongoose.Types.ObjectId(orderstatus),
            
        //   }
        // },
        // {
        //   $lookup: {
        //     from: 'users',
        //     localField: 'owner',
        //     foreignField: '_id',
        //     as: 'ownerDetails'
        //   }
        // },
        // {
        //   $unwind: '$ownerDetails'
        // },
      
      ]).then(function(orders) {
        console.log(";;;;",orders);
        res.status(200).json(orders)

      }).catch(function(err) {
        res.status(500).json("error")
      });


    } catch (error) {
      next(error)
    }
}





