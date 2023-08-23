import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import studentList from '../models/StudentSchema.js';
import UniversityModel from '../models/UniversitySchema.js';
import {uploadImage} from '../middlewares/cloudinary.js'



export const UniversityUpdate = async (req, res) => {
    try {
      console.log(req.body);
      const { name, email, type, location, base64Image} = req.body.formData;
 
      const {id} = req.body

  
    //   Check if the university ID is valid
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid university ID" });
      }
  
    console.log(13);
    const a = new mongoose.Types.ObjectId(id)
      const university = await UniversityModel.find({_id:id})
      console.log(university,"123");
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      console.log(122);
      const response = await uploadImage(base64Image)
 console.log(response,"00");
       const update = await UniversityModel.updateOne({_id:id},{
        $set:{
           
            UniversityName: name,
            UniversityLocation: location,
            Email: email,
            Location: location,
            UniversityType: type,
            Image: response,

        }
       })
      
  res.status(201).json({ message: " Edited successfully",response });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the student" });
    }
  };