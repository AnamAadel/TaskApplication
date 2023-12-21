import React, { useEffect, useState } from 'react';
import AddTaskButton from '../components/AddTaskButton';
import TodoList from '../components/TodoList';
import useGetTaskData from '../hooks/useGetTaskData';
import AddTaskForm from '../components/AddTaskForm';

function Dashboard() {
    const [taskData, refetch, isFetching] = useGetTaskData();
    const [isChangeStatus, setIsChangeStatus] = useState("")

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
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 '>
            <TodoList title="To Do" length={5} color="rgb(115 115 115)" placeName="to-do" tasks={toDoTask} setIsChangeStatus={setIsChangeStatus} isFetching={isFetching} />
            <TodoList title="On Going" length={5} color="rgb(59 130 246)" placeName="onGoing" tasks={onGoingTask} setIsChangeStatus={setIsChangeStatus} isFetching={isFetching} />
            <TodoList title="Completed" length={5} color="rgb(76, 175, 80)" placeName="completed" tasks={completedTask} setIsChangeStatus={setIsChangeStatus} isFetching={isFetching} />
        </div>

        <AddTaskForm setIsChangeStatus={setIsChangeStatus}  />
    </div>
  )
}

export default Dashboard