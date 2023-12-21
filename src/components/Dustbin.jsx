import React from 'react';
import { useDrop } from 'react-dnd';

function Dustbin() {
    const [object, drop] = useDrop(()=> ({
        accept: "box",
        drop: {name: "Dustbin"},
        collect: (monitor)=> ({
            canDrop: monitor.canDrop(),
            isOver: monitor.isOver()
        })
    }))

    console.log("object", object)
  return (
    <div ref={drop} className='min-w-[300px] h-[300px] flex justify-center items-center border-2 bg-gray-600'>Dustbin</div>
  )
}

export default Dustbin