import axios from 'axios'

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000"
  baseURL: "https://task-application-server.vercel.app"
})


function useAxiosPublic() {
  return axiosPublic
}

export default useAxiosPublic