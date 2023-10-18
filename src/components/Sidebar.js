import React, { useState , useContext } from "react";
import { Link , useNavigate } from "react-router-dom";
import Projects from "../images/3-layers.png";
import Hiring from "../images/users.png";
import Messages from "../images/Group.png";
import Support from "../images/bar-chart-2.png";
import Logo from "../images/Logo.png";
import Settings from "../images/settings.png";
import Avatar from "@mui/material/Avatar";
import Logout from "../images/Icon.png";



function Sidebar() {
  const navigate = useNavigate() ; 
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) ; 
  const logoutHandler = ()=>{
    localStorage.removeItem('authToken') ;
    localStorage.removeItem('userInfo') ;
    navigate('/') ;
  }
 
  return (
    <section className="flex gap-6 xs:hidden  md:inline ">
      <div
        className={`bg-[var(--background)] min-h-screen  w-[280px]
       duration-500 text-gray-100 px-4 flex flex-col justify-between`}
      >
        <div className="m-b-[30px]">
          <div className="py-3 flex justify-center">
            <img src={Logo} className="pt-[30px]" alt=""/>
          </div>
          <div className="mt-4 flex flex-col gap-4 relative">
            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Support} height="24px" width="24px" alt=""/>
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 `}
              >
                Dashboard
              </h2>
            </Link>

            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Projects} height="24px" width="24px"alt="" />
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500`}
              >
                Projects
              </h2>
            </Link>

            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Hiring} height="24px" width="24px" alt=""/>
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 `}
              >
                Hiring
              </h2>
            </Link>

            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Messages} height="24px" width="24px" alt=""/>
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 `}
              >
                Messages
              </h2>
            </Link>

            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Support} height="24px" width="24px" alt="" />
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 `}
              >
                Support
              </h2>
            </Link>

            <Link
              to="#"
              className={
                "mt-5 group flex items-center text-sm  gap-3.5 font-medium p-2 hover:bg-gray-800 rounded-md"
              }
            >
              <img src={Settings} height="24px" width="24px" alt="" />
              <h2
                style={{
                  transitionDelay: `300ms`,
                }}
                className={`whitespace-pre duration-500 `}
              >
                Settings
              </h2>
            </Link>
          </div>
        </div>

        <div className="flex   items-center py-[30px] border-t-[0.6px] ">
          <Avatar sx={{ height: "40px", width: "40px" }}>
            {userInfo?.name[0].toUpperCase()}
          </Avatar>
          <div className="flex flex-col items-start ml-[8px] mr-[3px]">
            <p className="text-xs text-[rgba(255,255,255,0.5)]">
              {userInfo.name}
            </p>
            <p className="text-sm">{userInfo?.email}</p>
          </div>
          <img src={Logout} height="30px" width="30px" onClick={logoutHandler} alt="" className="cursor-pointer"/>
        </div>
        
      </div>

      
    </section>
  );
}

export default Sidebar;
