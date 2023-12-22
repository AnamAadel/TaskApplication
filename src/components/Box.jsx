import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function Box({item}) {
    const [showDescription, SetShowDescription] = useState(false)

    return (
        <div className="flex flex-col max-w-md p-6 dark:bg-gray-900 dark:text-gray-100 gap-2 border bg-white relative">
        <button className='absolute top-[28px] right-3' onClick={()=> SetShowDescription(!showDescription)}>{showDescription ? <IoIosArrowUp />: <IoIosArrowDown />}  </button>
        
            <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className={showDescription ? "h-fit overflow-visible": "h-0 overflow-hidden"} >{item.description}</p>
                <p><b  className='text-orange-500'>Deadline: </b> <span >{item.date}</span></p>
                <p ><b className='text-green-500'>Priority: </b> <span>{item.priority}</span></p>
        </div>
    )
}

export default Box