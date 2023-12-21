import { useQuery } from '@tanstack/react-query';
import { AuthContexts } from '../components/context/AuthContext';
import useAxiosSecure from './useAxiosSecure';

function useGetTaskData() {
    const axiosSecure = useAxiosSecure();
    const {user} = AuthContexts();

    const {data: taskData = [], isFetching, error, refetch} = useQuery({
      queryKey: ["task", user?.email],
      queryFn: async ()=> {
      const res = await axiosSecure.get(`/task`);
      return res.data

      }
    })
    
  return [taskData, refetch, isFetching, error]
  
}

export default useGetTaskData