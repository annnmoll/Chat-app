import React, { useRef, useState , useContext } from 'react'
import { Link  , useNavigate } from 'react-router-dom';
import axios  from 'axios' ;
import { AppContext } from '../context/AppContext';
import Loading from '../components/Loading';


function Signup() {
   const { setSignupData , loading , setLoading} = useContext(AppContext) ; 

   
   const navigate = useNavigate() ; 
   const formRef = useRef() ;
   const submitHandler = async(e) =>{
    
    setLoading(true) ; 
    e.preventDefault() 
    const userObj = {
        name : formRef.current.name.value ,
        email : formRef.current.email.value ,
        password : formRef.current.password.value ,
        confirmPassword : formRef.current.confirmPassword.value ,

    }
    console.log(userObj) ;
    setSignupData(userObj) ; 
            await axios({
                method: "post",
                url: "http://localhost:5000/api/user/otp",
                data: userObj,
                headers: { "Content-Type": "application/json" },
            })
                .then((response) => {
                    setLoading(false) ;
                                         navigate('/otp')


                })
                .catch((error) => {
                 
                  alert(error.response.data.message)
                });

   
   }
   
    return loading ? (<Loading />) : (<section className="bg-[var(--background)]">
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Create and account
                </h1>
                <form ref={formRef} onSubmit={submitHandler}className="space-y-4 md:space-y-6" action="#">
                <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Fullname</label>
                        <input type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John Doe" required="" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                         <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                        <input type="password" name="confirmPassword" id="confirmPassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                    </div>
                   
                    <button type="submit" className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center hover:bg-[var(--background)] hover:text-white">Create an account</button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link to="/" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    </div>
  </section>)
 
}

export default Signup