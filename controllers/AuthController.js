import * as dotenv from 'dotenv';
dotenv.config();
import { generateToken } from '../middlewares/authVerify.js';
import UserModel from '../models/UserSchema.js';
import {validateLogin, validateRegistration} from '../Validation/Validation.js';
import bcrypt from 'bcrypt'


//User-Registration:

export const UserAuth = async(req,res,next)=>{
    try {
        const { error } = validateRegistration(req.body.Datas);
        const err={}
        if (error) {
            error.message=error.details[0].message
            error.statusCode=400
           return next(error)
        }
    
        console.log(req.body);
        const { name, email, password} = req.body.Datas;

        const existingUser = await UserModel.findOne({Email:email });
     
        if (existingUser) {
            console.log("yes");
            err.message="Email already exists"
            err.statusCode=400
           return next(err)
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            Name:name,
            Email:email,
            Password: hashedPassword,
        });
   

        await user.save();
      
        res.status(201).json({ message: 'User registered successfully' });
       
      } catch (error) {
        next(error)
      }
}

//User login :

export const UserLogin = async (req,res,next)=>{
    try{
    
        const { error } = validateLogin(req.body.formData);
        const err={}
        if (error) {
            error.message=error.details[0].message
            error.statusCode=400
           return next(error)
        }

        const { email, password } = req.body.formData;
        
        const User = await UserModel.findOne({ Email:email });
        console.log(User)
        if (!User) {
      
            err.message="No user with this email found"
            err.statusCode=405
           return next(err)
        }

        const passwordMatch = bcrypt.compareSync(password, User.Password);

        if (!passwordMatch) {
            err.message="Incorrect password"
            err.statusCode=400
           return next(err)
        }
        const Token = generateToken({User});
        res.status(200).json({ message: 'Login successful',User,Token });
    }
    catch(err){
        next(err)
    }
}