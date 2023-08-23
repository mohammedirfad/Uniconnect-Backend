import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import { generateToken } from '../middlewares/authVerify.js';
import studentList from '../models/StudentSchema.js';
import UniversityModel from '../models/UniversitySchema.js';
import {uploadImage} from '../middlewares/cloudinary.js'



//Add-student :



export const AddStudent = async (req, res) => {
  try {
    console.log(req.body);
    const { studentName, email, location, age, phoneNumber, image} = req.body.FormData;
    console.log(studentName,"lkj");
    const {id} = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid university ID" });
    }

 
    const university = await UniversityModel.findById(id);
    if (!university) {
      return res.status(404).json({ error: "University not found" });
    }
    const response = await uploadImage(image)
   
    const newStudent = new studentList({
      University: id,
      StudentName: studentName,
      Age: age,
      Email: email,
      Location: location,
      PhoneNumber: phoneNumber,
      Image: response,
    });

    
     await newStudent.save();
    
    

    res.status(201).json({ message: "Student added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred while adding the student" });
  }
};


export const getStudentList = async (req, res) => {
    try {
        const universityId = req.query.id;
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        if (!mongoose.Types.ObjectId.isValid(universityId)) {
            return res.status(400).json({ error: "Invalid university ID" });
        }

        const a = new mongoose.Types.ObjectId(universityId);
        const students = await studentList.find({ University: a })
            .populate("University")
            .skip((page - 1) * pageSize)
            .limit(pageSize);

        const totalStudents = await studentList.countDocuments({ University: a });

        if (!students) {
            return res.status(404).json({ error: "Students not found" });
        }

        res.status(200).json({ students, totalStudents });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching students with universities" });
    }
};


export const getStudent = async (req, res) => {

    try {
        const universityId = req.query.id;
    console.log(universityId);
         
        console.log(1);
        if (!mongoose.Types.ObjectId.isValid(universityId)) {
          return res.status(400).json({ error: "Invalid university ID" });
        }
        console.log(12);
 
   
        console.log(13);
        const a = new mongoose.Types.ObjectId(universityId)
        const students = await studentList.find({_id:a}).sort({createdAt:-1})

        console.log(students,",....");
        
    
        if (!students) {
          return res.status(404).json({ error: "students not found" });
        }
    
        res.status(200).json(students);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching students with universities" });
      }

}


export const UpdateStudent = async (req, res) => {
    try {
      console.log(req.body);
      const { studentName, email, location, age, phoneNumber, image} = req.body.FormData;
      console.log(studentName,"lkj");
      const {ids} = req.body
      const {studentid}=req.body
  
      // Check if the university ID is valid
    //   if (!mongoose.Types.ObjectId.isValid(ids)) {
    //     return res.status(400).json({ error: "Invalid university ID" });
    //   }
  
    console.log(13);
    const a = new mongoose.Types.ObjectId(ids)
      const university = await UniversityModel.find({_id:a})
      if (!university) {
        return res.status(404).json({ error: "University not found" });
      }
      const response = await uploadImage(image)
 
       const update = await studentList.updateOne({_id:studentid},{
        $set:{
           
            StudentName: studentName,
            Age: age,
            Email: email,
            Location: location,
            PhoneNumber: phoneNumber,
            Image: response,

        }
       })
  res.status(201).json({ message: "Student added successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while adding the student" });
    }
  };
  


  export const DelStudent = async (req, res) => {

    try {
        const id = req.query.id;
    
         
        console.log(1,id);
        // if (!mongoose.Types.ObjectId.isValid(universityId)) {
        //   return res.status(400).json({ error: "Invalid university ID" });
        // }
        // console.log(12);
 
   
        // c
        const a = new mongoose.Types.ObjectId(id)
        const students = await studentList.deleteOne({_id:a});

        console.log(students,",....");
        
    
        if (!students) {
          return res.status(404).json({ error: "students not found" });
        }
    
        res.status(200).json({message : "Deleted" });
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while fetching students with universities" });
      }

}