import React from 'react';
import { FaPlus } from "react-icons/fa6";
import { AuthContexts } from './context/AuthContext';

function AddTaskButton() {
    const {setIsShow} = AuthContexts();
  return (
    <div className='flex items-center gap-4 border w-full rounded-lg mt-20 md:mt-0 '>
        <button className='py-6 px-24 bg-green-300 text-neutral border rounded-lg' onClick={()=> setIsShow(true)}><FaPlus className='text-6xl' /></button>
        <h2 className='text-4xl font-bold'>Create New Task</h2>
    </div>
  )
}

export default AddTaskButton