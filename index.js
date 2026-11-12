

import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose'
import express from 'express'
import dbconnect from './config/database.js'
import 'dotenv/config';
import { redisConnect } from './config/redis.js';
import cookieParser from 'cookie-parser'
import userouter from './routes/user_routes.js'
import chatrouter from './routes/chatrouter.js'
import messagerouter from './routes/messagerouter.js'



const app=express();

app.use(express.json());
app.use(cookieParser());

app.use("/user",userouter);
app.use("/chat",chatrouter);
app.use("/message",messagerouter);
const startserver= async()=>{
    try{
        await dbconnect();
        await redisConnect();
        app.listen(3000,()=>{
            console.log('i am listening at 3000')
        })
    }
    catch(err){
        console.log(err.message);
    }
}

startserver();