import bcrypt from "bcryptjs"

import User from "../models/User.js";
import { createError } from "../error.js";
import Jwt from "jsonwebtoken";
// import mongoose from "mongoose";

export const signup = async (req, res, next) => {
   // console.log(req.body);
   try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.password, salt);
      const newUser = User({...req.body, password: hash })
      await newUser.save()
      res.status(200).send("User has been create")
   } catch (err) {
      // 
      next(err);

   }


}

export const signin = async (req, res, next) => {
   // console.log(req.body);
   try {
      const user = await User.findOne({ name: req.body.name })
      if (!user) {
         return next(createError(404, "User Not Found"))
      }
      const isCorrect = bcrypt.compare(req.body.password, user.password);
      if (!isCorrect) {
         //  return res.status(200).send("User Sign in successFull")
         return next(createError(400, "invalid credintail"))
      }
      const token = Jwt.sign({ id: user._id }, process.env.JWT);
      const { password, ...other } = user._doc
      console.log("sigin succfull");
      
         res.cookie("access_token", token, {
            httpOnly: true
         }).status(200).json(other)



   } catch (err) {
      // 
      next(err);

   }


}
export const googleAuth = async (req, res, next) => {
   try {
      console.log("googleAuth run");
      
      const user =await  User.findOne({ email: req.body.email });
      if (user) {
         const token = Jwt.sign({ id: user._id }, process.env.JWT);
         // const {password ,...other} = user._doc
         res.cookie("access_token", token, {
            httpOnly: true
         }).status(200).json(user._doc)

      } else {
         const newUser = new User({
            ...req.body, formGoogle: true
         })
         const savedUser = await newUser.save();
         const token = Jwt.sign({ id: savedUser._id }, process.env.JWT);
         // const {password ,...other} = user._doc
         res.cookie("access_token", token, {
            httpOnly: true
         }).status(200).json(savedUser._doc)
      }
   }catch(error){
      console.log("error");
      
      next(error);
   }
}
