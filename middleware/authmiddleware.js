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
        
        const payload = jwt.verify(token,process.env.KEY);

        const existingUser = await User.findById(payload.id);

        if(!existingUser){
            return res.status(404).json({
                message: "User Doesnt Exist"
            })
        }
        
        req.user = existingUser;
        next();

    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal Server Error"})
    }
}


export default authUserMiddleware;