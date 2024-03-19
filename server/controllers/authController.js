const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcryptjs');
require('dotenv').config();

const authController = {
    signup: async (req, res) => {
        try {
            const {name,email,password} = req.body;
            const existingUser = await User.findOne({name});
            if(existingUser){
                return res.status(400).json({msg:'Username already exists'})
            }

            const newUser = new User({name,email,password});
            await newUser.save();

            const token = jwt.sign({ userId:newUser._id}, process.env.JWT_SECRET);
            res.json({token})
        } catch (err) {
            console.log(err);
        }
    },

    login: async (req,res)=>{
        try{
            const {email,password} = req.body;
            //check if user exists in the db
            const user = await User.findOne({email});
            if(!user){
                return res.status(401).json({msg:"Invalid email or password"})
            }
            
            //validate password
            const isValidPassword = await bcrypt.compare(password,user.password);
            if(!isValidPassword){
                return res.status(401).json({message:"Invalid email or password"})
            }
            //create and send token
            const token = jwt.sign({userId:user._id},process.env.JWT_SECRET ,{expiresIn: "1h"});
            res.json({token,userId:user._id});
        }catch(error){
            console.error('Error logging in:',error);
            res.status(500).send("Internal server error");
        }
    },
    logout: async(req,res)=>{
        try{
            res.clearCookie('jwt');
            res.json({msg:"Logged out!"});
        }catch(e){
            res.status(500).send("Internal server error");
        }
    }
}
module.exports = authController;