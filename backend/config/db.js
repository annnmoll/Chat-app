const mongoose = require('mongoose') ;
require('dotenv').config()  ; 


const dbConnect = async()=>{
    await mongoose.connect(process.env.DB_URL).then(()=>{
        console.log('Connected to database successfully ');
    }).catch(e => { console.log('Failed to connect ot database') ;console.log(e.message)})
}


module.exports = dbConnect ; 