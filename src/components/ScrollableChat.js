import React , {useContext} from 'react'
import ScrollableFeed from 'react-scrollable-feed'


function ScrollableChat ({messages}) {
    
    const userInfo = JSON.parse(localStorage.getItem('userInfo')) ;
    
    
  return (
    
    <ScrollableFeed className=' no-scrollbar '>
        {messages && messages.map((m  , i )=> <div className=' w-[100%] flex flex-col  ' key={i}>
        
            <span className={`relative flex-auto rounded-[10px]  px-[15px] py-[15px] max-w-[75%] bg-[rgba(255,255,255,0.1)] text-white mt-3 mx-4 break-words ${(userInfo._id === m.sender._id )? "self-end" :  "self-start" } `} >
                {m.content}
                
            </span>
        
        </div>)}
    </ScrollableFeed>
  )
}

export default ScrollableChat