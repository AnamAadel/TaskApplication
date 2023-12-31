import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import DashboardNav from './components/DashboardNav';
import SideBar from './components/SideBar';
import { AuthContexts } from './components/context/AuthContext';

function RootDashboard() {
  const {loading} = AuthContexts();
  return (
    <>
          <ToastContainer />
            {!loading && 
              <div className='flex gap-6'>
                <SideBar />
                <DashboardNav />
                <div className='md:pl-[320px] w-full'>
                <Outlet />
                

                </div>
                
              </div>
            }
            {loading &&  <div className='min-h-screen w-full fixed z-50 flex justify-center bg-slate-300 items-center'><img src='https://cdn.slidevision.io/www/14304000000085015_loader.gif' className='w-72 mix-blend-multiply' /></div> }
    </>
  )
}

export default RootDashboard

