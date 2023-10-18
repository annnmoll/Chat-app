import React, { useContext, useEffect } from 'react'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import ToggleSwitch from '../components/ToggleSwitch'
import ChatCard from '../components/ChatCard'
import ChatBox from '../components/ChatBox'
import axios from 'axios' ;
import {AppContext} from '../context/AppContext' 

function Home() {

  const {chats , setChats , selectedChat , setSelectedChat ,searchResults , setSearchResults ,  loggedUser } = useContext(AppContext) ;

   

  const accessChat = async(user)=>{
    try{
      const token = localStorage.getItem('authToken') ; 
      console.log('inside access chat')
      
      const config = {
        headers :{
        "Content-type"  : "application/json" , 
          authorization : `Bearer ${token}`
        }      }
      await axios.post('http://localhost:5000/api/chat' ,{userId : user._id}, config).then(response =>{
         console.log(response.data) ; 
         
        // setSelectedChat(response?.data) ; 
        
        setSearchResults([]) ;

        fetchChats() ; 
      }).catch(e => { console.log(e.message)})

    }catch(e){
      console.log(e.message)
    }
  }
  const fetchChats = async()=>{
    try{
      const token = localStorage.getItem('authToken') ; 
      const config = {
        headers :{
          authorization : `Bearer ${token}`
        }      }
      const {data} = await axios.get('http://localhost:5000/api/chat' , config);
      
      setChats(data.data)
      setSelectedChat(data.data[0]) ; 

    }catch(e){
      alert(e)
    }

  }

  useEffect(()=>{
 fetchChats()  ; 

  } , [] )
  return (
    <div className='flex'>
      <div><Sidebar /></div>
      
      <div className='w-[calc(100vw-280px)] flex flex-col bg-[var(--background)]'>
      <Navbar />


       <div className='min-h-[93vh] flex justify-center items-center'>
      <div className='w-[1064px] h-[753px] bg-transparent flex flex-row  !border-solid !border-[1px] rounded-xl border-collapse items-center '  >
         
         <div className='w-[35%] h-[97%] bg-[var(--background)] my-[10px] border-r-[1px]' >
          <div className='w-[100%] h-[72px] flex justify-center items-center border-b-[1px] '>
          <ToggleSwitch />
          </div>
          { (searchResults.length > 0 ) ? ( searchResults?.map((user , i) => <ChatCard key={i} user={user} accessChat={accessChat}/>) ): 

                                            (chats?.map((chat , i ) => <ChatCard key={i}  chat={chat} />))}
         </div>
         <div className='w-[63%] h-[97%] bg-[black] my-[10px]'>
          
            <ChatBox />
          
         </div>
</div>
      </div>
      
      
      </div>
      
    </div>
  )
}

export default Home