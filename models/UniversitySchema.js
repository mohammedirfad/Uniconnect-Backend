import mongoose from "mongoose";
import validator from "validator";

const UniversitySchema = mongoose.Schema(
  {
    UniversityName: {
      type: String,
      //  required: [true,"please Tell your Name !"],
      minLen: [3, "University Name must have atleast 2 Letters"],
      maxlen: [25, "University Name must have atmost 25 Letters"],
  
    },
    UniversityLocation: {
      type: String,
  required:true,
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
  
    UniversityType: {
      type: String,
    },
    UniversityProfile :{
      type: String,
    },
    Image: {
      type: String,
    },

    UniversityID: {
      type: String,
   
    },
  },
  { timestamps: true }
);

const UniversityList = mongoose.model("University", UniversitySchema);

export default UniversityList;
