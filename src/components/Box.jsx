import React, { useEffect } from 'react'
import { useDrag } from 'react-dnd'

const typeItem = {
    Box: "box"
}
function Box({name}) {
    const [isDragging, drag] = useDrag(()=> ({
        type: typeItem.Box,
        item: {name}, 
        end: (item, monitor)=> {
            console.log("item end:",item)
            console.log("monitor end:",monitor);
        },
        collect: (monitor)=> ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        })
    }))

    
    useEffect(()=> {
        console.log("isDragging", isDragging )
        console.log("drag", drag )

    },[drag, isDragging])
    
  return (
    <div ref={drag} className='min-w-[100px] h-[100px] flex justify-center items-center border-2'>{name}</div>
  )
}

export default Box