import React, { useEffect } from 'react';
import { IoCloseCircleOutline } from "react-icons/io5";
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import noUserPhoto from "../assets/user.png";
import { AuthContexts } from './context/AuthContext';

function SideBar() {
    const { user, userPhoto, logOutUser, userName, showSidebar, setShowSidebar } = AuthContexts();
    const navigation = useNavigate();

    const logOut = ()=> {
        logOutUser().then(() => {
            // 
            toast.success("Sign-out successful.", {
              theme: "colored",
              toastId: "success"
            });
            navigation("/")
          }).catch((error) => {
            // An error happened.
            console.log(error)
            toast.warn(`An error happened`, {
              theme: "colored"
            });
          });
    }

    useEffect(() => {
        window.onresize = () => {
          const windowWidth = window.innerWidth;
          if (windowWidth < 768) {
            setShowSidebar(false)
          } else {
            setShowSidebar(true)
    
          }
    
        }
    
        if (window.innerWidth < 768) {
            setShowSidebar(false)
        }else{
            setShowSidebar(true)

        }
    
        
      }, [setShowSidebar])
    
    return (
        <aside className={`group/sidebar flex flex-col shrink-0  transition-all duration-300 ease-in-out m-0  z-40 inset-y-0 left-0 bg-white border-r border-r-dashed border-r-neutral-200 sidenav fixed ${showSidebar ? "lg:w-[300px] w-[250px]": "w-0 p-0 overflow-hidden"}`} id="sidenav-main">
        
            <button className='absolute top-8 right-8 text-3xl block md:hidden' onClick={()=> setShowSidebar(false)}><IoCloseCircleOutline /></button>
            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-xl sm:px-12 dark:bg-gray-900 dark:text-gray-100">
                <img src={userPhoto ? userPhoto : noUserPhoto}  alt="" className="w-32 h-32 mx-auto rounded-full dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y dark:divide-gray-700">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">{user ? `Hi! ${userName || user.displayName}` : "What's up, bro?"}</h2>
                        
                    </div>
                    
                </div>
            </div>

            <div className="hidden border-b border-dashed lg:block dark:border-neutral-700/70 border-neutral-200"></div>

            <div className="relative pl-3 my-5 overflow-y-scroll">
                <div className="flex flex-col w-full font-medium">

                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <NavLink to="/" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Home</NavLink>
                        </span>
                    </div>
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <NavLink to="/dashboard" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Task</NavLink>
                        </span>
                    </div>
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <NavLink to="/dashboard/completedTask" className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark">Completed Task</NavLink>
                        </span>
                    </div>
                    <div>
                        <span className="select-none flex items-center px-4 py-[.775rem] cursor-pointer my-[.4rem] rounded-[.95rem]">
                            <button className="flex items-center flex-grow text-[1.15rem] dark:text-neutral-400/75 text-stone-500 hover:text-dark" onClick={logOut} >Log out</button>
                        </span>
                    </div>

                </div>
            </div>
        </aside>
    )
}

export default SideBar