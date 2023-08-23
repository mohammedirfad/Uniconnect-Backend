import nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();
import { generateToken } from '../middlewares/authVerify.js';
import UniversityModel from '../models/UniversitySchema.js';
import {validateLogin, validateRegistration} from '../Validation/Validation.js';
import bcrypt from 'bcrypt'


//University-Registration:

export const UniversityAuth = async(req,res)=>{
    try {
        const { error } = validateRegistration(req.body.datas);
        if (error) {
          return res.status(400).json({ message: error.details[0].message });
        }
    
        const { universityName, email, password, universityType, location } = req.body.datas;

        const existingUniversity = await UniversityModel.findOne({ email });
     
        if (existingUniversity) {
          return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const extractedLetters = universityName.substring(0, 3).toUpperCase();
        const extractedNumbers = parseInt(new mongoose.Types.ObjectId().toString().slice(-4), 16);
        const universityID = `${extractedLetters}${extractedNumbers}`;

        const university = new UniversityModel({
            UniversityName:universityName,
            Email:email,
            Password: hashedPassword,
            UniversityType:universityType,
            UniversityLocation:location,
            UniversityID:universityID
        });
   

        await university.save();
      
        res.status(201).json({ message: 'University registered successfully' });
        try{
            const transporter = nodemailer.createTransport({
                service : "gmail",
                auth :{
                    user:process.env.USER,
                    pass:process.env.PASSWORD
                }
            });
            console.log(email)
            const mailOptions = {
                from :process.env.USER,
                to :email,
                subject:"Greetings From UniConnect " ,
                html: `<div>
                <h1>Welcome to UniConnect Student Management Portal</h1>
            
                <h1>Hi,</h1>
            
                <p>Thank you for joining UniConnect's Student Management Portal. We are excited to have you as a part of our university community.</p>
                <p>With our portal, you have access to powerful tools and features that will make student management efficient and hassle-free. From tracking student records to managing courses and schedules, we've got you covered.</p>
                
                <p>We are committed to providing you with the best experience and helping you streamline your university's student management processes.</p>
            
                <p>If you have any questions or need assistance, please feel free to reach out to our support team.</p>
            
                <p>Best regards,</p>
                <h1 style="color: #007bff;">Manager : Mohammed Irfad</h1>
                <h1>UniConnect</h1>
            </div>`
            }

            transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log(error,"errir at email sending")
                }
                else{
                    console.log("email send",info.response)
                }
            })

        }
        catch(err){
            console.log(err)
        }

      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
}

//university login :

export const UniversityLogin = async (req,res)=>{
    try{
      
        console.log(req.body.Datas);
        const { error } = validateLogin(req.body.Datas);

        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        console.log(2);
        const { email, password } = req.body.Datas;
        
        const University = await UniversityModel.findOne({ Email:email });

        console.log(1);
        if (!University) {
            return res.status(405).json({ error: 'No user with this email found' });
        }

        const passwordMatch = bcrypt.compareSync(password, University.Password);

        if (!passwordMatch) {
            return res.status(400).json({ error: 'Incorrect password' });
        }
        const Token = generateToken({University});
        res.status(200).json({ message: 'Login successful',University,Token });
    }
    catch(err){
        console.log(err,"error occured during login");
    }
}