import React from 'react';
import { useDrop } from 'react-dnd';
import useAxiosSecure from '../hooks/useAxiosSecure';
import ListItem from './ListItem';
import { AuthContexts } from './context/AuthContext';

function TodoList({title, length, color, placeName, tasks, setIsChangeStatus, isFetching}) {
    const axiosSecure = useAxiosSecure();
    const {user} = AuthContexts();
    

    console.log(placeName, tasks)
    const [{canDrop, isOver}, drop] = useDrop(()=> ({
        accept: "list",
        drop: ()=> ({
            name: placeName,
            placeName
        }),
        hover: (item, monitor)=> ({
            name: placeName
        }),
        collect: (monitor)=> ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }))

  return (
    <div ref={drop} className='p-4 rounded shadow-md bg-opacity-10 relative' style={{backgroundColor: color}}>
        <h3 className={`py-4 px-3  text-neutral text-xl mb-4 rounded-xl bg-white font-bold`}> {title} ({tasks.length})</h3>
        <div className={`absolute top-0 left-0 bg-neutral w-full flex justify-center items-center z-50 transition-all duration-300 overflow-hidden ${isOver  ? "h-full" : "h-0"}`} >
            <h4 className='text-white font-semibold text-5xl '>Drop</h4>
        </div>
        <div className='max-h-screen overflow-auto space-y-4'>
            {
                !isFetching ? tasks.map(item => (
                    <ListItem key={item._id} color={color} id={item._id} item={item} placeName={placeName}  setIsChangeStatus={setIsChangeStatus} />

                )):
                <span className="loading loading-dots loading-lg mx-auto block text-white"></span>
            }
            
        </div>
    </div>
  )
}

export default TodoList