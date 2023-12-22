import React, { useEffect, useState } from 'react';
import AddTaskButton from '../components/AddTaskButton';
import AddTaskForm from '../components/AddTaskForm';
import Benefits from '../components/Benefits';
import TodoList from '../components/TodoList';
import UpdateTaskForm from '../components/UpdateTaskForm';
import useGetTaskData from '../hooks/useGetTaskData';

function Dashboard() {
    const [taskData, refetch, isFetching] = useGetTaskData();
    const [isChangeStatus, setIsChangeStatus] = useState("")
    const [taskId, setTaskId] = useState("")

    const toDoTask = taskData.filter(item => item.status === "to-do");
    const onGoingTask = taskData.filter(item => item.status === "onGoing");
    const completedTask = taskData.filter(item => item.status === "completed");

    useEffect(()=> {
        console.log("refetch", refetch);
        refetch()
    },[isChangeStatus, refetch])

  return (
    <div className='w-full space-y-3'>
        <AddTaskButton  />
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start'>
            <TodoList
              title="To Do"
              color="rgb(115 115 115)" 
              placeName="to-do" 
              tasks={toDoTask} 
              setIsChangeStatus={setIsChangeStatus} 
              isFetching={isFetching} 
              setTaskId={setTaskId}
            />

            <TodoList 
              title="On Going" 
              color="rgb(59 130 246)" 
              placeName="onGoing" 
              tasks={onGoingTask} setIsChangeStatus={setIsChangeStatus} 
              isFetching={isFetching} 
              setTaskId={setTaskId} 
            />

            <TodoList 
              title="Completed" 
              color="rgb(76, 175, 80)" 
              placeName="completed" 
              tasks={completedTask} 
              setIsChangeStatus={setIsChangeStatus} 
              isFetching={isFetching} 
              setTaskId={setTaskId}
            />
        </div>

        <Benefits />

        <AddTaskForm setIsChangeStatus={setIsChangeStatus}  />
        <UpdateTaskForm setIsChangeStatus={setIsChangeStatus} id={taskId}  />
    </div>
  )
}

export default Dashboard