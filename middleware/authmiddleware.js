import jwt from "jsonwebtoken"
import User from "../model/userschema.js";
import dotenv from "dotenv";
dotenv.config();
const authUserMiddleware = async(req,res,next)=>{

    try{
        
        const {token} = req.cookies;
        if(!token){
            return res.status(401).json({
                message:"need to login first"
            })
        }
        const blockedtoken=await client.get(
            `blocklist${token}`
        )
      
           if (blockedToken) {
            return res.status(401).json({
                message: "Please login again"
            });
        }
        
        const payload = jwt.verify(token,process.env.KEY);

      req.userId = payload.id;
        req.token = token;
        req.tokenPayload = payload;

        
     
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export default authUserMiddleware;