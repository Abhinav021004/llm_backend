<<<<<<< HEAD
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose'
import express from 'express'
import dbconnect from './config/database.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userouter from './routes/user_routes.js'
import chatrouter from './routes/chatrouter.js'
import messagerouter from './routes/messagerouter.js'

dotenv.config()


const app=express();
app.use(express.json())
app.use(cookieParser());

app.use("/user",userouter);
app.use("/chat",chatrouter);
app.use("/message",messagerouter);
const startserver= async()=>{
    try{
        await dbconnect();
        app.listen(3000,()=>{
            console.log('i am listening at 3000')
        })
    }
    catch(err){
        console.log(err.message);
    }
}
=======
import dns from 'dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
import mongoose from 'mongoose'
import express from 'express'
import dbconnect from './config/database.js'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import userouter from './routes/user_routes.js'
import chatrouter from './routes/chatrouter.js'
import messagerouter from './routes/messagerouter.js'

dotenv.config()


const app=express();
app.use(express.json())
app.use(cookieParser());

app.use("/user",userouter);
app.use("/chat",chatrouter);
app.use("/message",messagerouter);
const startserver= async()=>{
    try{
        await dbconnect();
        app.listen(3000,()=>{
            console.log('i am listening at 3000')
        })
    }
    catch(err){
        console.log(err.message);
    }
}
>>>>>>> 41e80fe081ea816987f99119d36f4bd02b434080
startserver();