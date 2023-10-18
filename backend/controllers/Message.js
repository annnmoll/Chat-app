const User = require("../models/userSchema") ; 
const Message = require("../models/messageSchema");
const Chat = require('../models/chatSchema') ;

exports.sendMessage = async (req, res) => {
  try {
    const { content, chatId } = req.body;
    console.log(req.body)
    if (!content || !chatId) {
      return res.status(400).json({
        success: false,
        message: "Invalid data passed ",
      });}

      var  newMessage = {
        sender : req.user[0]._id , 
        content  : content , 
        chat : chatId 
      }


      var message = await Message.create(newMessage) ; 
       message = await message.populate("sender" , "name") ;
       message = await message.populate("chat")  ;
       message = await User.populate(message , {
        path : 'chat.users' , 
        select : 'name email '
       }) ;


       await Chat.findByIdAndUpdate({_id : req.body.chatId} , {  latestMessage : message}) ;


       res.json({
        success : true , 
        data : message 
       })


    
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Failed to send message",
    });
  }
};

exports.allMessages = async (req, res) => {
  try {

   const messages = await Message.find({chat : req.params.chatId}).populate("sender" , "name email").populate("chat") ;

   return res.status(200).json({
    success : true ,
    data : messages 
   })

  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      success: false,
      error: e.message,
      message: "Failed to fetch messages ",
    });
  }
};
