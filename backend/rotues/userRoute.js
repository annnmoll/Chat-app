const express = require('express') ; 
const routes = express.Router() ; 
const {body , validationResult } = require('express-validator') ; 
const protect = require('../middlewares/authMiddleware') ;
 
const { signup , login , sendOtp , allUsers  } = require('../controllers/User');





routes.post('/otp' ,[body('email' , 'Incorrect email').isEmail()  , body('password' , 'Password length must be 8').isLength({min:8})], sendOtp )  ; 
routes.post('/createuser',signup )
routes.post('/getuser' , login)
routes.get('/' ,protect  ,  allUsers) ;








module.exports = routes ;   