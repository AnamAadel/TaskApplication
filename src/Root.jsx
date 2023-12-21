import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { AuthContexts } from './components/context/AuthContext'
import Navbar from './pages/shared/Navbar'

function Root() {
  const {loading} = AuthContexts();
  return (
    <>
            {!loading && 
              <>
                <Navbar />
                <Outlet />
                <Footer />
              </>
            }
            {loading &&  <div className='min-h-screen w-full fixed z-50 flex justify-center bg-slate-300 items-center'><img src='https://cdn.slidevision.io/www/14304000000085015_loader.gif' className='w-72 mix-blend-multiply' /></div> }
    </>
  )
}

export default Root

//   {
    //     "name": "Smartwatch",
    //     "icon": "FaWatchmanMonogram"
    //   },