import mongoose from "mongoose";
import validator from "validator";

const StudentSchema = mongoose.Schema(
  {
    University: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"University"
  
    },
    StudentName: {
      type: String,
  required:true,
    },
    Age: {
        type: Number,
       
        required:true,
      },

    Email: {
      type: String,
      required: true,
      unique: true,
      validate: [validator.isEmail, "Please enter a valid email address"],
    },
    Location:{
        type:String,
        required:true
    },
    PhoneNumber: {
      type: Number,
      required:true,
     
    
    },
  
    Image: {
      type: String,
    },

   
  },
  { timestamps: true }
);

const StudentsList = mongoose.model("Student", StudentSchema);

export default StudentsList;
