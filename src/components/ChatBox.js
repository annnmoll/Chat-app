import React, { useContext, useRef, useState , useEffect } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Input, Button } from "@material-tailwind/react";
import Attachements from "../images/Label.png";
import { AppContext } from "../context/AppContext";
import ScrollableChat from './ScrollableChat' ; 
import axios from "axios";
import { io } from "socket.io-client";

function ChatBox() {
  const [allMessages, setAllMessages] = useState([]);
  
  const endpoint = "http://localhost:5000";
  var socket, selectedChatCompare;

  const messageRef = useRef();
  const userData = JSON.parse(localStorage.getItem('userInfo')) ;
  console.log('userData' , userData) ; 
  
  const { selectedChat, getSenderName } = useContext(AppContext);
  const [socketConnected , setSocketConnected] = useState(false) ;





  const fetchMessages = async()=>{
    try{
      if(!selectedChat){return ; }
      const token = localStorage.getItem('authToken') ; 
      const config ={headers:{
        authorization : `Bearer ${token}`
      }}
      const {data} = await axios.get(`http://localhost:5000/api/message/${selectedChat._id}` , config ) ;
      console.log('data' , data.data) ;
      setAllMessages(data.data) ; 
      socket.emit('join chat' , selectedChat._id) ;  


    }catch(e){
alert(e.message)
    }
  }

  useEffect(()=>{
    return ()=>{
        socket.on('message received' , (newMessageRecieved)=>{
          console.log('newMessageRecieved' , newMessageRecieved) ; 
          if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
            //give notifications
          }
          else{
            setAllMessages([...allMessages,newMessageRecieved ]) ; 

            console.log(allMessages) ;
            console.log(allMessages) ;console.log(allMessages) ;
          }
        })
    }
  })

  const messageHandler = async (e) => {
    e.preventDefault();
    
    if(messageRef.current.value === '') {alert('Write a message') ; return ; }
    
    try {
      const token = localStorage.getItem("authToken");
      const config = {
        headers: {
          "Content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };
      
      const { data } = await axios.post(
        "http://localhost:5000/api/message",
        { content: messageRef.current.value, chatId: selectedChat?._id },
        config
        );
        messageRef.current.value = ''  
        socket.emit('new message' , data.data)
        setAllMessages([...allMessages , data.data ])
        console.log("data" , data.data );
        
        
        
      } catch (e) {
        alert(e.message);
    }
  };

  useEffect(()=>{
    socket = io(endpoint) ;
    socket.emit("setup" , userData ) ; 
    socket.on("connection" , ()=> setSocketConnected(true))
  }  ) ;
  useEffect(()=>{
    fetchMessages() ; 
    
    selectedChatCompare = selectedChat ; 
      } , [selectedChat])
    
    


  return (
    <div className="w-[100%] h-[100%] bg-[var(--background)]">
      <div className="w-[100%] h-[72px] flex justify-between items-center text-white px-5 border-b-[1px] ">
        <p className="text-[18px]">{getSenderName(selectedChat)}</p>
        <MoreVertIcon />
      </div>

      <div className="h-[calc(100%-72px-80px)]">
        {/* {loading }  */}
        <div className="flex flex-col overflow-y-scroll h-[100%] no-scrollbar" >
          <ScrollableChat messages = {allMessages}   />
        </div>
      </div>

      <div className="relative flex items-center w-full  h-[86px] w-[100%] justify-between px-5">
        <form
          onSubmit={messageHandler}
          className="relative w-[82%] h-[100%] flex-auto flex flex-row  justify-between items-center"
        >
          <div className=" relative w-[82%] h-[100%]">
            <input
              ref={messageRef}
              type="text"
              placeholder="Write a message..."
              className="pr-20 h-[72px] w-[100%] bg-black  h-[75%] px-6 rounded-xl  text-white "
            />
            <Button
              size="sm"
              color={ "blue-gray"}
              
              className="!absolute right-1 top-2 rounded items-center text-center "
            >
              <img src={Attachements} />
            </Button>
          </div>

          <div className="h-[82%]">
            <button
              type="submit"
              className="bg-[var(--orangeBackground)] text-white py-3 px-7 rounded-[10px]"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatBox;
