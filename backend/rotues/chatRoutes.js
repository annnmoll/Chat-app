const express = require('express') ;
const routes = express.Router() ; 
const protect = require('../middlewares/authMiddleware')

const {accessChat , fetchChats} = require('../controllers/Chat') ; 


routes.post('/' ,protect , accessChat ) ;
routes.get('/' ,protect ,  fetchChats) ; 



module.exports = routes ; 