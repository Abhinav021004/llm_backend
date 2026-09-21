import express from 'express'
import authUserMiddleware from '../middleware/authmiddleware.js';
import { getmessage,sendmessage } from '../controller/messagecontroller.js';
const messagerouter=express.Router();

messagerouter.use(authUserMiddleware);

messagerouter.post('/',sendmessage);

messagerouter.get('/:chatId',getmessage);
messagerouter.post('/:chatId',sendmessage);


export default messagerouter;