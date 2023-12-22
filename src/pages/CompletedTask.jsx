import React from 'react';
import Box from '../components/Box';
import useGetTaskData from '../hooks/useGetTaskData';

function CompletedTask() {
    const [taskData, refetch, isFetching] = useGetTaskData();
    const completedTask = taskData.filter(item => item.status === "completed");
    return (
        <section className="p-10 w-full min-h-screen mt-16 md:mt-0 bg-stone-300 dark:bg-gray-800 dark:text-gray-100">
            <div className="container mx-auto p-4 my-6 space-y-2 text-center">
                <h2 className="text-5xl font-bold">Your Completed Task</h2>
                
            </div>
            <div className="container mx-auto grid justify-center gap-6 sm:grid-cols-2 lg:grid-cols-3 bg-stone-500 p-16 ">
            {
                completedTask.length > 0 ? completedTask.map(item => (
                    <Box item={item} key={item._id} />

                )):
                <h2 className='font-bold text-white text-center py-12 text-4xl col-span-full'>No Completed Task</h2>
            }
            </div>
        </section>
    )
}

export default CompletedTask