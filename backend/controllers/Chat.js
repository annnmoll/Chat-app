const  Chat = require('../models/chatSchema') ; 
const User = require('../models/userSchema') ;
const Message = require('../models/messageSchema') ; 

exports.accessChat = async(req  , res)=>{
    try{
        
        const {userId} = req.body ; 
       
            
        if(!userId) {
           return res.status(400).json({
            success :false , 
            message : 'Please enter the userId' 
           })
        }


    
  var isChat = await Chat.find( {$and : [{users: {$elemMatch : {$eq : req.user[0]._id}}} , {users: {$elemMatch : {$eq : userId}}}]}).populate("users"); 

  isChat = await User.populate(isChat , {
    path : "latestMessage.sender" , 
    select : "name email"
  })
  

  if(isChat.length > 0 ){
    
    res.send(isChat[0]) ;
  }
  else{
    
    var chatData = {
        chatName : "Sender" , 
        isGroupChat : false , 
        users :[req.user[0].id , userId] 
    }

    const createdChat = await Chat.create(chatData) ;
    console.log(createdChat) ;
    const fullChat = await Chat.findOne({_id : createdChat._id}).populate("users") ;
    
    return res.status(200).json({
        success : true , 
        data : fullChat
    })
  }

    }catch(e){
        return res.status(500).json({
            success : false , 
            message : e.message,
            error : "Failed to access chat"
        })
    }

}




exports.fetchChats = async(req  , res)=>{
    try{
        await Chat.find({ users: { $elemMatch: { $eq: req.user[0]._id } } })
        .populate("users")
        .populate("latestMessage")
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email",
          });
          
          
          res.status(200).json({ success : true ,  data : results});
        });

    }catch(e){ 
        return res.status(500).json({
            success : false , 
            message : e.message ,
            error : "Failed to access chat"
        })
    }

}



