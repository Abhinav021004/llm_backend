import express from 'express'
import mongoose from 'mongoose'
import User from '../model/userschema.js';
import Message from '../model/meassge.js';
import Chat from '../model/chat.js';
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser';
import { signupschema,loginschema } from '../validator/userValidator.js';

const createtoken=(id,email)=>{
    if(!process.env.KEY){
        throw new Error('"jwt secret');
    }
   const token= jwt.sign({id,email},process.env.KEY,{expiresIn:'1h'})
   return token;
}
const cookiesoption={
    httpOnly:true,
    maxAge:60*60*1000,
    secure:false

}

export const signup=async (req,res)=>{
    try{
        const result=signupschema.safeParse(req.body);
        if(!result.success){
            return res.status(401).json({
                message:result.error.issues[0].message
            })
        }
        const{email,password,name,age}=result.data;

        const user=await User.findOne({email});
        if(user){
            return res.status(409).json({
                message:'allready exist'
            })
        }

        const hashpassword = await bcrypt.hash(password,12);

        const usercreate=await User.create({
            name,
            age,
            email,
            password:hashpassword
        })

        const token=createtoken(usercreate._id,email);
        res.cookie('token',token,cookiesoption)
        res.status(201).json({
            message:'user signed in successfully',
            name,
            age,
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message:'internal server erro'
        })
    }
}

export const login=async (req,res)=>{
    try{
        const result=loginschema.safeParse(req.body);
        if(!result.success){
            return res.status(401).json({
                message:result.error.issues[0].message
            })
        }
        const{email,password}=result.data;

        const existinguser=await User.findOne({email})
        if(!existinguser){
            return res.status(401).json({message:'invalid user'})
        }

        const ismatch = await bcrypt.compare(password,existinguser.password);
        if(!ismatch){
            return res.status(401).json({message:'invalid user'})
        }

        const token=createtoken(existinguser._id,existinguser.email);

        res.cookie('token',token,cookiesoption)
        res.status(200).json({
            message:'user logged in'
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const logout= async(req,res)=>{
    res.clearCookie("token",{
        httpOnly:true,
        secure:false,
    })
    res.status(200).json({
        message:'user logged out'
    })
}

export const profile = async(req,res)=>{
    try{
        res.status(200).json({
            name:req.user.name,
            age: req.user.age,
            usage: req.user.usage,
            email: req.user.email
        })
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}

export const deleteAccount=async(req,res)=>{
    try{
        const userId=req.user._id;
        await Message.deleteMany({userId});
        await Chat.deleteMany({userId});
        await User.deleteOne({_id:userId});

        res.clearCookie("token",{
            httpOnly:true,
            secure:false
        })
        res.status(200).json({
            message: "Account deleted successfully"
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}