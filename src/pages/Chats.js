import React, { useEffect , useState } from 'react' ;
import axios from 'axios';

function Chats() {

    const [chats , setChats] = useState([]) ;


    const fetchChats = async()=>{
        const {data} = await axios.get('http://localhost:5000/api/chats') ;
        console.log('data' ,data) ;
         setChats(data) ; 
    }

    useEffect(()=>{ fetchChats()} , [])
  return (

    <div className='chats__container'>
    
        {   
            chats.map((chat , i ) =>  <h1 key ={i}>{chat.chatName}</h1> )  
        }
    </div>
  )
}

export default Chats