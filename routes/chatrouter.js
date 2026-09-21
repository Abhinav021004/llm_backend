import express from 'express';
import authUserMiddleware from '../middleware/authmiddleware.js';
import { createchat,getrecentchat,getsinglechat,deletechat } from '../controller/chatcontroller.js';

const chatrouter=express.Router();
chatrouter.use(authUserMiddleware);


chatrouter.post('/createchat',createchat);
chatrouter.get('/recentchat',getrecentchat);
chatrouter.get('/:chatId',getsinglechat);
chatrouter.delete('/:chatId',deletechat);


export default chatrouter;