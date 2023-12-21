import React from 'react'
import { useDrop } from 'react-dnd'
import ListItem from './ListItem'

function TodoList({title, length, color, placeName}) {
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

    console.log(canDrop, isOver)

  return (
    <div ref={drop} className='p-4 rounded shadow-md bg-opacity-10 relative' style={{backgroundColor: color}}>
        <h3 className={`py-4 px-3  text-neutral text-xl mb-4 rounded-xl bg-white `}> {title} ({length})</h3>
        <div className={`absolute top-0 left-0 bg-neutral w-full flex justify-center items-center z-50 transition-all duration-300 overflow-hidden ${isOver  ? "h-full" : "h-0"}`} >
            <h4 className='text-white font-semibold text-5xl '>Drop</h4>
        </div>
        <div className='max-h-screen overflow-auto space-y-4'>
            <ListItem color={color} id={1} placeName={placeName} />
            <ListItem color={color} id={2} placeName={placeName} />
            <ListItem color={color} id={3} placeName={placeName} />
            <ListItem color={color} id={4} placeName={placeName} />
            <ListItem color={color} id={5} placeName={placeName} />
        </div>
    </div>
  )
}

export default TodoList