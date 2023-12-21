import { useState } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { BsGithub } from 'react-icons/bs';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { AuthContexts } from "../components/context/AuthContext";


function Register() {
    const {handleGoogleSignIn, handleGithubSignIn, createUser} =  AuthContexts();
    const [showPassword, setShowPassword] = useState(false);

    const handleCreateUser = (e)=> {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        const userName = e.target.userName.value;
        const file = e.target.file.files[0]

        const userImage = file ? file : null;

        console.log(file)
        // console.log(password)
        // console.log(userName)
        if(/^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/.test(password)){

            createUser(email, password, userName, userImage)
            toast.success("your registration has completed successfully",{
                toastId: "success",
                theme: "colored"
            })
        }else{
            toast.warn("The password should be greater than 6 characters, contain at least one capital letter, and have at least one special character.",{
                theme: "colored"
            });
            console.log("false")
        }
    }

    const handleShowPassword = ()=> {
        setShowPassword(!showPassword);
        console.log(showPassword)

    }
    return (
        <div className="hero min-h-screen bg-base-200">
        <ToastContainer />
            <div className="hero-content flex-col lg:flex-row-reverse">

                <div className="flex flex-col gap-4 text-5xl p-6 text-left">
                    <button onClick={handleGoogleSignIn} className="cursor-pointer border-4 rounded-full text-lg p-4 flex gap-2 items-center">
                        <FcGoogle className='text-4xl' />
                        Continue With Google
                    </button>
                    <button onClick={handleGithubSignIn} className="cursor-pointer border-4 rounded-full text-lg p-4 gap-2 flex items-center ">
                        <BsGithub className='text-4xl' />
                        Continue With Github
                    </button>
                    {/* <BsFacebook onClick={handleFacebookSignIn} className="cursor-pointer" /> */}
                </div>
                <span className='text-3xl font-bold'>OR</span>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div className="card-body">
                        <form onSubmit={handleCreateUser}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">User Name</span>
                                </label>
                                <input type="text" name='userName' placeholder="User Name" className="input input-bordered" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control relative" >
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type={showPassword ? "text" : "password"} placeholder="password" className="input input-bordered" name='password' required />
                                <button className='absolute bottom-3 right-2' type='button' onClick={handleShowPassword}>{showPassword ? <AiFillEye className='text-xl' /> : <AiFillEyeInvisible className='text-xl' />}</button>
                            </div>
                            <div className="form-control space-y-4">
                                <input type="file" className="file-input file-input-bordered mt-4 w-full max-w-xs " name='file' />
                                <p className='font-bold text-sm mt-2'>If You have already registered, Please <Link to="/login" className='text-blue-400'>Log in.</Link></p>
                            </div>
                            <div className="form-control mt-2">
                                <button className="btn bg-dark hover:bg-dark text-white" >Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register