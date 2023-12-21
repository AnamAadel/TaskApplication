import React, { useEffect, useState } from 'react';
import { useDrag } from 'react-dnd';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { toast } from 'react-toastify';
import useAxiosSecure from '../hooks/useAxiosSecure';
function ListItem({color, id, placeName, item, setIsChangeStatus}) {
    const [showDescription, SetShowDescription] = useState(false)
    const axiosSecure = useAxiosSecure();


    const [{isDragging, dropResult}, drag] = useDrag(()=> ({
        type: "list",
        item: {id}, 
        end: (item, monitor)=> {
            const dropResult = monitor.getDropResult()
            console.log("placeName: ", dropResult)

            axiosSecure.patch(`/task/${item.id}`, {status: dropResult.name}).then(res => {
                console.log(res.data)
                if(res.data.modifiedCount > 0){
                    setIsChangeStatus(item.id + dropResult.name)
                    toast.success("Task updated successfully!", {
                        theme: "colored",
                        toastId: "success"
                
                      });

                }
            }).catch(err => {
                console.log(err);
            })

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
        
            <h2 className="text-xl font-semibold">{item.title}</h2>
                <p className={showDescription ? "h-fit overflow-visible": "h-0 overflow-hidden"} >{item.description}</p>
                <p><b  className='text-orange-500'>Deadline: </b> <span >{item.date}</span></p>
                <p ><b className='text-green-500' style={{color: color}}>Priority: </b> <span>{item.priority}</span></p>
        </div>
    )
}

export default ListItem