import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from 'react-hook-form';
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContexts } from './context/AuthContext';
function AddTaskForm() {
  const { isShow, setIsShow, user } = AuthContexts();
  const axiosSecure = useAxiosSecure();
  const screen = isShow ? "flex" : "none"
  const [startDate, setStartDate] = useState(new Date());
  const [addTaskPending, setAddTaskPending] = useState(false);
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()



  const handleBooking = async (data) => {
    setAddTaskPending(true)
    data = { ...data, email: user?.email, date: startDate.toLocaleDateString(), status: "to-do" }

    axiosSecure.post("/bookings", data).then(res => {

      setAddTaskPending(false)


        swal({
            title: "Confirm Booking!",
            text: "Your Booking completed successfully!",
            type: "success",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "See Your Booking",
            closeOnConfirm: false
        }).then(isConfirm => {
            if (isConfirm) {
                navigation("/dashboard/myBookings")
            }
        })
    }).catch(err => {
        console.log(err)
        setAddTaskPending(false)
        swal({
            title: "there is an error",
            icon: "warning",
        });

    })

    console.log(data);


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
      <button className="absolute top-10 right-10 text-white text-6xl" onClick={() => setIsShow(false)}><IoMdClose /></button>
      <div className="max-h-full p-10 w-full sm:w-[600px] overflow-y-auto sm:rounded-2xl bg-white">
        <form onSubmit={handleSubmit(handleBooking)}>
          <div className="mb-5">
            <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
              Title
            </label>
            <input type="text" name="name" id="name" placeholder="Full Name"
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md" {...register("title", { required: true })} />
            {errors.title && <span className="text-red-400">This field is required</span>}
          </div>

          <div className='col-span-full'>
            <label className="text-neutral dark:text-gray-200" htmlFor="passwordConfirmation">Description</label>
            <textarea id="textarea" type="textarea" className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" {...register("description", { required: true })} ></textarea>
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
            <select className="select select-bordered" {...register("priority", { required: true })} >
              <option value='low'>Low</option>
              <option value='moderate'>Moderate</option>
              <option value='high,'>high</option>
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

export default AddTaskForm