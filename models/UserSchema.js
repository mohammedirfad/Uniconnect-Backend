import mongoose from "mongoose";
import validator from "validator";

const UserSchema = mongoose.Schema(
  {
    Name: {
      type: String,
      //  required: [true,"please Tell your Name !"],
      minLen: [3, "User Name must have atleast 2 Letters"],
      maxlen: [25, "User Name must have atmost 25 Letters"],
  
    },

    Email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    Password:{
        type:String,
        required:true
    },
    Cart: [{
      BookId:{type:mongoose.Types.ObjectId,
        ref:"Book",
        required: [true],
    }
    }],
    WishList: [{
      BookId:{type:mongoose.Types.ObjectId,
        ref:"Book",
        required: [true],
    }
    }],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
