import express from 'express'
import authUserMiddleware from '../middleware/authmiddleware.js';
import {login,signup,logout,profile,deleteAccount} from '../controller/user_controller.js'

const userouter=express.Router();
 
userouter.post('/login',login);
userouter.post('/signup',signup);
userouter.post('/logout',logout);
userouter.get('/profile',authUserMiddleware,profile)
userouter.delete("/delete",authUserMiddleware,deleteAccount);

export default userouter;