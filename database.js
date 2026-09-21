import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose'
import express from 'express'

const dbconnect=async()=>{
    
      await  mongoose.connect(process.env.MONGO_URL);
        console.log('connected')
    
  
}
export default dbconnect