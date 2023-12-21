import React from 'react'
import AddTaskButton from '../components/AddTaskButton'
import TodoList from '../components/TodoList'

function Dashboard() {
  return (
    <div className='w-full space-y-3'>
        <AddTaskButton />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
            <TodoList title="To Do" length={5} color="rgb(115 115 115)" placeName="to-do"  />
            <TodoList title="On Going" length={5} color="rgb(59 130 246)" placeName="onGoing"  />
            <TodoList title="Completed" length={5} color="rgb(76, 175, 80)" placeName="completed" />
        </div>
    </div>
  )
}

export default Dashboard