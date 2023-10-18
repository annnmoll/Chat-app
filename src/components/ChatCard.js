import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

function ChatCard({user ,chat ,  accessChat}) {
  
  const {setSelectedChat , selectedChat , getSenderName } = useContext(AppContext) ; 
  var latestMessage = chat?.latestMessage ?  (   chat.latestMessage.content.length>40 ?  chat.latestMessage.content.substring(0 , 40) + "..." : chat.latestMessage.content ) : "Start a chat..."
  
  
 
  //  console.log(accessChat) ;
  
  
 
 
  return (
    <div onClick={ ()=> { accessChat ? accessChat(user) :  setSelectedChat(chat)}} className={`h-[87px] w-90% flex flex-col items-start  gap-3 text-white py-2  pl-[16px] pt-[10px] border-b-[1px] hover:border-l-[4px]  cursor-pointer hover:border-l-[var(--orangeBackground)] ${(chat && selectedChat?._id === chat._id ) ?  "border-l-[4px] !border-l-[var(--orangeBackground)]" : ""  }`}    >
        <p className='text-[16px] font-normal'>{ user?.name || getSenderName(chat) }</p>
        <p className='text-[14px]'>{latestMessage}</p>
    </div>
  )
}

export default ChatCard
