const express = require('express')
const app = express() ; 
const {chats } = require('./data/data') ;
const dbConnect = require('./config/db') ;
const userRoutes = require('./rotues/userRoute') ;
const chatRoutes = require('./rotues/chatRoutes') ; 
const messageRoutes = require('./rotues/messageRoutes') ;
const cors = require('cors') ;

 require('dotenv').config() ;


 app.use(cors()) ;
app.use((req, res,next) => {
    res.setHeader("Access-Control-Allow-Origin" , "http://localhost:3000") ; 
    res.header("Access-Control-Allow-Headers" , "Origin, X-Requested-With, Content-Type ,Accept") ;
    next() ; 
})
app.use(express.json()) ;
app.use('/api/user' , userRoutes) ; 
app.use('/api/chat' , chatRoutes) ; 
app.use('/api/message' , messageRoutes) ;

app.get('/' , (req , res)=>{ res.send('App is working fine ')}) ; 
app.get('/api/chats' , (req , res)=>{ res.send(chats)})
app.get('/api/chats/:_id' , async(req , res)=>{ 
    const chatObj = await chats.find(c => c._id ===  req.params._id) ;
    res.json({chatObj}) ; 
}) ;

dbConnect() ;
 const server =   app.listen(process.env.PORT , ()=>{console.log('App started at port 5000')}) ;
const io = require('socket.io')(server , {
    pingTimeout : 60000 , 
    cors :{origin : "http://localhost:3000"}
    
}) ; 

io.on("connection" , (socket)=>{
    console.log('Connected to socket.io') ; 

    socket.on('setup' , (userData)=>{ 
        socket.join(userData._id) ; 
        console.log(userData._id) ;
        socket.emit("connected")  ;  
    })

    socket.on('join chat' , (room)=>{
        socket.join(room) ;
        console.log("User joined Room" + room) ; 
    })

    socket.on('new message' , (newMessageReceived) =>{
        var chat = newMessageReceived.chat ;
        console.log(newMessageReceived)  ; 

        if(!chat.users) return console.log('Chat not defined') ;
        chat.users.forEach((user)=>{
            
            if(user._id === newMessageReceived.sender._id) {return ;}
            socket.in(user._id).emit("message received" , newMessageReceived)
        })
    })
}) 