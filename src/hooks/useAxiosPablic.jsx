import axios from 'axios'

const axiosPublic = axios.create({
  // baseURL: "http://localhost:5000"
  baseURL: "https://assignment-12-server-vercel.vercel.app"
})


function useAxiosPublic() {
  return axiosPublic
}

export default useAxiosPublic