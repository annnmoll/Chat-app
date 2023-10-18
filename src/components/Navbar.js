import React  , {useContext, useRef , useState} from 'react'
import NotificationsIcon from '@mui/icons-material/Notifications';
import axios from 'axios' ; 
import { AppContext } from '../context/AppContext';
function Navbar() {

  const inputRef = useRef() ; 
  const token  = localStorage.getItem('authToken') ;
 
  const { setSearchResults } = useContext(AppContext) ; 

  const handleSearch = async()=>{
    const keyword = inputRef.current.value ;
    inputRef.current.value = ''

    if( !keyword){
      alert('Please enter a keyword') ; 
      return ;
    }
    try{
      // setLoading(true) ; 
      const config = {
        headers :{
          authorization : `Bearer ${token}`
        }      }

        const {data} = await axios.get(`http://localhost:5000/api/user?search=${keyword}` , config ) ;
        // setLoading(false) ;
        
        setSearchResults(data.data) ; 

        
        
    }catch(e){
      // alert('No user exist ')
      console.log(e.message)
    }

  }


  return (
    <nav
    className="relative flex w-full flex-wrap items-center justify-end bg-[var(--background)] py-4   lg:py-4">
    <div className="ml-5 flex w-[30%] items-center justify-between">
    <div className='flex-auto'>
   <form className='w-[100%]'>
      <input
         ref = {inputRef }
         id ='input-search'
         
        type="search"
        className=" relative m-0 block w-[100%] min-w-0  rounded-xl  bg-black bg-clip-padding px-6 py-[0.25rem] text-base font-normal leading-[1.6] text-white outline-none transition duration-200 ease-in-out focus:z-[3] "
        placeholder="Search"
        aria-label="Search"
        aria-describedby="button-addon2" />
         <button className='hidden' type='submit' onClick={e => {e.preventDefault() ; handleSearch() ;  } }>Submit</button>
        </form>
        </div>
    
  
      {/* <!--Search icon--> */}
      <span
        className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
        id="basic-addon2">
       <NotificationsIcon sx={{color:"white"}}/>
      </span>
    </div>
  </nav>
  )
}

export default Navbar