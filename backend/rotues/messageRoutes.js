const express = require('express') ;
const routes = express.Router() ;
const {sendMessage ,allMessages} = require('../controllers/Message') ;  
const protect = require('../middlewares/authMiddleware') ; 

routes.post('/' , protect ,sendMessage)
routes.get('/:chatId' ,protect ,  allMessages)

module.exports = routes ;