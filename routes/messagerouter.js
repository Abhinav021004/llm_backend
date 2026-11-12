import express from 'express'
import authUserMiddleware from '../middleware/authmiddleware.js';
import loadUserMiddleware from '../middleware/loadUserMiddleware.js';
import tokenUsageMiddleware from '../middleware/tokenUsageMiddleware.js';
import unauthenticatedRateLimiter from '../middleware/unauthenticatedRateLimiter.js';
import authenticatedRateLimiter from '../middleware/authenticatedRateLimiter.js';
import { getmessage,sendMessage } from '../controller/messagecontroller.js';
const messagerouter=express.Router();

messagerouter.use(authUserMiddleware);
messagerouter.use(authenticatedRateLimiter);


messagerouter.post('/',tokenUsageMiddleware,loadUserMiddleware,sendMessage);

messagerouter.get('/:chatId',loadUserMiddleware,getmessage);
messagerouter.post('/:chatId',tokenUsageMiddleware,loadUserMiddleware,sendMessage);


export default messagerouter;