import React from 'react';
import { SiTask } from 'react-icons/si';
import { Link } from 'react-router-dom';
import { AuthContexts } from './context/AuthContext';

function DashboardNav() {
    const { showSidebar, setShowSidebar } = AuthContexts();
    return (
        <div className="navbar text-white fixed z-30 bg-blue-500 border-b-2 md:hidden justify-between">
            <div className="flex-none">
                <button className="btn btn-square btn-ghost" onClick={() => setShowSidebar(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                </button>
            </div>
            <div className="" >
                <Link to="/" className="btn text-xl space-x-2"><SiTask className='text-4xl' /> ProTaskHub</Link>
            </div>
        </div>
    )
}

export default DashboardNav