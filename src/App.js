import {Routes , Route} from 'react-router-dom' ;
import Home from './pages/Home';

import Login from './pages/Login';
import Signup from './pages/Signup';
import Otp from './pages/Otp';

function App() {
  
  const authToken = (localStorage.getItem('authToken')) ;
  return (
    <div className="h-[100vh] w-[100vw]">
      <Routes>
        <Route  path ='/' element ={ authToken ? <Home /> :   <Login />}/>
        <Route  path ='/chats' element ={<Home />}/>
        <Route  path='/signup' element={<Signup />}/>
        <Route  path='/otp' element={<Otp />}/>
      </Routes>      
    </div>
  );
}

export default App;
