import express from "express";
import Chat from "../model/chat.js";
import Message from "../model/meassge.js";
import User from "../model/userschema.js";

export const createchat= async(req,res)=>{
   try{
       const{model}=req.body;
       if(!model){
        res.status(401).json({
            message:'no model given'
        })
       }

       const chat=await Chat.create({
        userId:req.user._id,
        model,
       })
       res.status(201).json({
        chatid: chat._id,
        model
       })
   }

 catch(err){

        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
}
export const getrecentchat=async(req,res)=>{
       try{
        const chat=await Chat.find({userId:req.user._id}).select('topic updatedAt').sort({updatedAt:-1}).limit(20)
         
        
      res.status(200).json({
        message: "Your all recent chats",
        chat
      })
   }

 catch(err){

        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
 
}
export const getsinglechat=async(req,res)=>{
      try{
          
        const {chatId} = req.params;

        const chat = await Chat.findOne({_id:chatId, userId: req.user._id});

        if(!chat){
            return res.status(404).json({
                messages: "Sorry not data found"
            })
        }

        res.status(200).json({
            chatId: chat._id,
            userId: chat.userId,
            topic: chat.topic,
            usage: chat.usage
        }) 
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message: "Interna server error"
        })
    }
}

    

export const deletechat=async(req,res)=>{
       try{
        
          
        const {chatId} = req.params;
         console.log("chatId:", chatId);
console.log("logged in user:", req.user._id);

       const chat = await Chat.findOne({_id:chatId, userId: req.user._id});

       if(!chat){
            return res.status(403).json({
                message: "You are not allowed to do this"
            })
       };

        await Message.deleteMany({
            chatId
        })

        await Chat.deleteOne({
            _id: chatId
        });

       

        res.status(200).json({
            message: "Your chat deleted successfully"
        })
   }

 catch(err){

        console.log(err);
        res.status(500).json({
            message: "Internal Server error"
        })
    }
    
}