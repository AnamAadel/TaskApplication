import { useQuery } from '@tanstack/react-query';
import { AuthContexts } from '../components/context/AuthContext';
import useAxiosSecure from './useAxiosSecure';

function useGetSpecificTask(id) {
  const axiosSecure = useAxiosSecure();
    const {user} = AuthContexts();

    const {data, isFetching, error, refetch} = useQuery({
      queryKey: [id, user?.email],
      queryFn: async ()=> {
      const res = await axiosSecure.get(`/task/${id}?email=${user?.email}`);
      return res.data

      }
    })
    
  return {data, refetch, isFetching, error}
}

export default useGetSpecificTask