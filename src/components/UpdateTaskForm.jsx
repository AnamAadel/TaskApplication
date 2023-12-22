import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import swal from 'sweetalert';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContexts } from './context/AuthContext';


function UpdateTaskForm({id, setIsChangeStatus}) {
  const { isFormShow, setIsFormShow , user } = AuthContexts();
  const axiosSecure = useAxiosSecure();
  const screen = isFormShow ? "flex" : "none"
  const [addTaskPending, setAddTaskPending] = useState(false);
  const navigation = useNavigate();
  const [data, setData] = useState([])
  // const {data = [], isFetching, error, refetch} = useQuery({
  //   queryKey: [id],
  //   queryFn: async ()=> {
  //     const res = await axiosSecure.get(`/task/${id}?email=${user?.email}`);
  //     // setStartDate(res.data.date)
  //     return res.data
      
  //   }
  // })
  const [startDate, setStartDate] = useState(new Date());

  const [priority, setPriority] = useState(data?.priority);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  

  useEffect(()=> {
    const fetchData = async ()=> {
      const res = await axiosSecure.get(`/task/${id}?email=${user?.email}`);

      console.log(res.data.title)
      setTitle(res.data.title)
      setDescription(res.data.description)
      // setStartDate(new Date(res?.data.date))
      setPriority(res.data.priority)
    }
    fetchData();

  },[axiosSecure, user, id])
  
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()


  const handleUpdateTask = async (data) => {
    setAddTaskPending(true)
    data = { ...data, email: user?.email, date: startDate.toLocaleDateString() }

    axiosSecure.put(`/task/${id}?email=${user?.email}`, data).then(res => {

      setAddTaskPending(false)
      console.log(res)
      if(res.data.acknowledged){
          toast.success("Task inserted successfully!", {
            theme: "colored",
            toastId: "success"
    
          });
          setIsChangeStatus("" + (Math.random() * 100))
          setIsFormShow(false)

      }
    }).catch(err => {
        console.log(err)
        setAddTaskPending(false)
        swal({
            title: "there is an error",
            icon: "warning",
        });

    })
  }

  const handleAlert = () => {
    swal({
      title: "Before Log in",
      text: "You will not be able to book this package.",
      type: "warning",
      showCancelButton: true,
      dangerMode: true,
      buttons: true,
    }).then(isConfirm => {
      if (isConfirm) {
        navigation("/login")
      }
    })
  }

  return (
    <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10 z-50" style={{ display: screen }}>
      <button className="absolute top-10 right-10 text-white text-6xl" onClick={() => setIsFormShow(false)}><IoMdClose /></button>
      <div className="max-h-full p-10 w-full sm:w-[600px] overflow-y-auto sm:rounded-2xl bg-white">
        <form onSubmit={handleSubmit(handleUpdateTask)}>
        <h3 className="text-center font-bold text-3xl pb-8">Update Your Task</h3>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
              Title
            </label>
            <input type="text" name="name" id="name" placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" {...register("title", { required: true })} value={title} onChange={(e)=> setTitle(e.target.value)} />
            {errors.title && <span className="text-red-400">This field is required</span>}
          </div>

          <div className='col-span-full'>
            <label className="text-neutral dark:text-gray-200" htmlFor="passwordConfirmation">Description</label>
            <textarea id="textarea" type="textarea" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register("description", { required: true })} value={description} onChange={(e)=> setDescription(e.target.value)} ></textarea>
            {errors.description && <span className="text-red-400">This field is required</span>}
          </div>

          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3">
              <div className="mb-5">
                <label htmlFor="date" className="mb-3 block text-base font-medium text-[#07074D]">
                  Deadline
                </label>
                <DatePicker id="date"
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" selected={startDate} onChange={(date) => setStartDate(date)} />
              </div>
            </div>
          </div>
          <div className="form-control w-full mb-5">
            <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
              priority
            </label>
            <select className="select select-bordered" {...register("priority", { required: true })} value={priority} onChange={(e)=> setPriority(e.target.value)} >
              <option value='low'>Low</option>
              <option value='moderate'>Moderate</option>
              <option value='high'>high</option>
              <option value='Highest'>Highest</option>
              <option value='Extreme'>Extreme</option>
            </select>
            {errors.priority && <span className="text-red-400">This field is required</span>}
          </div>

          
            <div>
              {
                !addTaskPending ?
                  <button
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none">Add
                  </button>
                  :
                  <button
                    className="hover:shadow-form w-full rounded-md bg-[#6A64F1] pointer-events-none py-3 px-8 text-center text-base font-semibold text-white outline-none">
                    <span className="loading loading-dots loading-lg"></span>
                  </button>

              }
            </div>
        </form>
      </div>
    </div>
  )
}

export default UpdateTaskForm