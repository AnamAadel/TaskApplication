import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
function ListItem({color, id, placeName}) {
    const [showDescription, SetShowDescription] = useState(false)

    const [{isDragging, dropResult}, drag] = useDrag(()=> ({
        type: "list",
        item: {name: id}, 
        end: (item, monitor)=> {
            const dropResult = monitor.getDropResult()
            console.log("placeName:", dropResult)
        },
        collect: (monitor)=> ({
            isDragging: monitor.isDragging(),
            dropResult: monitor.getDropResult(),

        })
    }))


    useEffect(()=> {
        console.log("isDragging", isDragging )
        console.log("dropName", dropResult )

    },[dropResult, isDragging])
    return (
        <div ref={drag} className="flex flex-col max-w-md p-6 dark:bg-gray-900 dark:text-gray-100 gap-2 border bg-white relative ">
        <button className='absolute top-[28px] right-3' onClick={()=> SetShowDescription(!showDescription)}>{showDescription ? <IoIosArrowUp />: <IoIosArrowDown />}  </button>
        
            <h2 className="text-xl font-semibold">Leroy Jenkins</h2>
                <p className={showDescription ? "h-fit overflow-visible": "h-0 overflow-hidden"} >Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur non deserunt</p>
                <p><b  className='text-orange-500'>Deadline: </b> <span >10/12/20024</span></p>
                <p ><b className='text-green-500' style={{color: color}}>Priority: </b> <span>Low</span></p>
        </div>
    )
}

export default ListItem