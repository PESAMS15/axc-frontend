import React from 'react'
import { useFormik } from 'formik'
import { useState, useEffect } from 'react'
import * as yup from "yup"
import axios from 'axios'
import log from "../Assets/OIP.jpeg"
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import Loader from './Loader'
const Signin = () => {
    const navigate = useNavigate()
    const [alluser, setalluser] = useState(null)
    const [loader, setloader] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
    const [err, seterr] = useState("")
 
    const formik = useFormik({
        initialValues:{
            email: "",
            password: "",
        },  
        validationSchema: yup.object({
           
            email: yup.string().email("Must be a valid email ").required("this field is required"),
            password: yup.string().required("this field is required"),
        }),
        onSubmit: (values)=>{
            setloader(true)
            console.log(values)
            let uri = "https://axc-tickets.onrender.com/users/signin"
                axios.post(uri, values).then((res)=>{
                    setloader(false)
                    console.log(res)
                    toast.success(res.data.message)
                    localStorage.setItem("token",res.data.token)
                    setTimeout(() => {
                        navigate("/")
                    }, 3000)
                }).then()
                .catch((err)=>{
                    setloader(false)
                    console.log(err)
                    // seterr(err)
                    toast.error(err.response.data.message)
                })
            
        }
    })

  return (
    <div>
        {loader? <Loader /> : ""}
            <form className='w-full b text-center md:text-start p-3 mx-auto shadow-lg   gap-y-9 md:w-1/2 shadow-md-none' onSubmit={formik.handleSubmit} action="">
            <div className='mt-10'>
            {/* <img className="w-32 mx-auto round  ed-full" src={log} alt="" /> */}
            <div className="text-black font-semibold text-3xl mb-3 text-start">Sign In</div>
        <div className='text-start'>Don't have an account ? <Link className='text-blue-700' to="/signup">Sign up</Link></div>

            </div>
            <div className="form-group my-5 text-start">
                <label htmlFor="" className=' font-normal text-start mb-2 block text-md'>Email</label>
                <input name='email' placeholder='eg: johndoe@gmail.com' onChange={formik.handleChange}  type="email" className={formik.errors.email? "border-2 border-red-500  mb-2 bg-indigo-100 block outline-none rounded-md w-full py-3 px-2": " mb-2 bg-indigo-100 block outline-none rounded-md w-full py-3 px-2"} />
                <small className='text-red-500'>{formik.errors.email}</small>

            </div>
            <div className="form-group my-5 text-start">
                <label htmlFor="" className=' font-normal text-start mb-2 block text-md'>Password</label>
               <div  className={formik.errors.password? "w-full flex border-2 rounded px-2 bg-indigo-100 border-red-500": "w-full flex border-2 rounded px-2 bg-indigo-100"}> <input  name='password' placeholder='eg: **********' onChange={formik.handleChange}   type={showPassword ? 'text' : 'password'} className={formik.errors.password? " mb-2 bg-indigo-100 block outline-none rounded-md w-full py-3 px-2": " mb-2 bg-indigo-100 block outline-none rounded-md w-full py-3 px-2"} />
                <button type='button' onClick={togglePasswordVisibility}> {showPassword ? 'Hide' : 'Show'}</button>
               </div>
                <small className='text-red-500'>{formik.errors.password}</small>

            </div>
            <button type='submit'  className='py-4 rounded bg-gray-900 mt-5 text-white font-semibold w-full  mx-auto '>Sign In</button>
            <ToastContainer 
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </form>
    </div>
  )
}

export default Signin