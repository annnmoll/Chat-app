const jwt = require('jsonwebtoken');
require('dotenv').config();
const User = require('../models/userSchema');


const protect = async (req, res, next) => {

    try {
        //extract token 
        const token =  req.headers?.authorization.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'token is missing '
            })

        } 
     
        const decode = await jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = await User.find({_id : decode.id});
        next();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json({
            success: false,
            message: 'error in token handling',
            error: e.message
        })
    }

}


module.exports = protect