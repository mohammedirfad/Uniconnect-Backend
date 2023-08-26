import mongoose from "mongoose";
import validator from "validator";

const BookSchema = mongoose.Schema(
  {
    UserId:{type:mongoose.Types.ObjectId,
        ref:"User",
        required: [true],
    },
    Name: {
      type: String,
      //  required: [true,"please Tell your Name !"],
      minLen: [3, "Book Name must have atleast 2 Letters"],
      maxlen: [50, "Book Name must have atmost 25 Letters"],
  
    },

    Price: {
      type: Number,
      required: true,
    },
    Genere:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        required:true
    },
    Image:{
        type:String,
        required:true
    }
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", BookSchema);

export default Book;
