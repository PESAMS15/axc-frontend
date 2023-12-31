import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'
import Loader from './Loader'
import {useNavigate}from "react-router-dom"






const Pay = () => {
    const navigate = useNavigate()
const [done, setdone] = useState(false)
const [Data, setData] = useState(null)
let id =localStorage.getItem("id")
const [ticketPi, setTicketPi] = useState(null);
const [ticketPic, setTicketPic] = useState(null);
const [loader, setloader] = useState(false)


const uri = "https://axc-tickets.onrender.com/users/verify"
// const navigate = useNavigate();
const token = localStorage.getItem("token")
console.log(token)
setInterval(
    useEffect(() => {
        axios.get(uri, {
            headers: {
                Authorization: `bearer ${token}`
            }
        }).then((res) => {
            toast.success(res.data.message)
            
            
    
        })
        .catch((err) => {
          
            toast.error("please Login")
            console.log(err)
            // navigate("/signin")
            setTimeout(() => {
                navigate("/signin")
            }, 2000);
        })
    
    
    
    }, [])
    
, 1000);


const [selectedPlan, setSelectedPlan] = useState(null);
let pic = localStorage.getItem("pic")
// console.log(id)
useEffect(() => {
    axios.post(`https://axc-tickets.onrender.com/users/getseat`, {el: id}).then((response) => {
        // console.log(response)
        setData(response.data);
      });
}, [])

const handlePlanChange = (event) => {
    setSelectedPlan(event.target.value);
  }
  const get = ()=>{
    setdone(false)
    navigate("/")

  }
  const handleImageChange = (e) => {
    const file = e.target.files[0]
 const reader = new FileReader()
 reader.readAsDataURL(file)
 reader.onload = () => {
     const result = reader.result
    //  console.log(result)
     setTicketPi(result)
     setloader(true)
     
    //  console.log(ticketPi)
   

    
     setTimeout(() => {
        postI(result)
     }, 2000);
  
 }
};

    const postI =(result)=>{
        
            let url = "https://axc-tickets.onrender.com/users/upload"
            setloader(true)
            // console.log(ticketPi)
            axios.post(url, {files: result}).then((result)=>{
        
               
                // console.log(result)
                setTicketPic(result.data.secure_url)
                setloader(false)
                // setdone(true)
            }).catch((err)=>{
                setloader(false)
                console.log(err)
            })
           
    }
  const postImage = () => {
    setloader(true)
    // console.log(files)
    
    axios.post("https://axc-tickets.onrender.com/users/post", {artist: Data.owner, price: Data.price, receipt: ticketPic}).then((res)=>{
        // console.log(res)
        setloader(false)
        setdone(true)
        // toast.success("transaction succcessful")
     
    }).catch((err)=>{
        setloader(false)
        console.log(err)
    })
}
const suc = ()=>{
    
}


  return (
    <div>
        {loader? < Loader /> : ""}
        <div className={`md:w-1/2 w-full mx-auto md:shadow-lg p-5  mt-3`}>
            <h2 className="text-blue-500 bg- text-3xl font-bold text-center  font-serif">
                <sup>AXC</sup> Tickets
            </h2>
            <img src={pic} alt="" className="my-3 rounded-full h-20 mx-auto w-20" />
            <div className='flex font-medium my-3 justify-between'>
                <div>Artist:</div>
                <div className='capitalize text-blue-500'>{Data && Data.owner}</div>
            </div>
            <div className='flex font-medium my-3 justify-between'>
                <div>Ticket price:</div>
                <div className='capitalize text-blue-500'>${Data && Data.price}</div>
            </div>
            <div className='flex font-medium my-3  items-center justify-between'>
                <div>Payment method:</div>
                <select value={selectedPlan} onChange={handlePlanChange} className="bg-indigo-100  cursor-pointer block outline-none rounded-md w-1/3 py- px-3 pr-4 my-2">
                    <option value="" disabled selected>Select a plan</option>
                    <option value="Available soon">Paypal</option>
                    <option value="$mlking82">Cash app</option>
                    <option value="1kQ2hAQyKDDEWRi3Szw7Ajoan3Nk9y8gh">Bitcoin</option>
                </select>
            </div>
            <div className='flex font-medium my-3 justify-between'>
                <div>details:</div>
                <div className='capitalize text-blue-500'>{selectedPlan}</div>
            </div>
            <div className="mb-4">
            <img src={ticketPi && ticketPi} className='mx-auto h-60' alt="" />
            <div className="flex justify-end">
          <label htmlFor="ticketPic" className='my-3 bg-indigo-500 font-medium p-3 rounded text-white hover:bg-indigo-600   cursor-pointer text-center w-40 block '>Upload receipt</label>

            </div>
          {/* <button></button> */}
          <input
            type="file"
            id="ticketPic"
            onChange={handleImageChange}
            className="w-full border rounded p-2 hidden"
            required
          />
        </div>
        {/* <button type="button" onClick={postImage}>post</button> */}

        <button disabled={selectedPlan   === null || ticketPi === null} onClick={postImage} className={`w-full block ${selectedPlan && ticketPi? " bg-red-800 hover:bg-red-700": "bg-gray-500"} text-white font-semibold text-lg rounded-lg mt-2 p-3`}>
            Make Payment
        </button>

        </div>
        <div className={`text-3xl my-3 md:w-1/2 shadow-lg text-center mx-auto ${done? "block" : "hidden"} `}>

            <div className="fixed inset-0 w-full  flex items-center bg-[rgba(0,0,0,0.4)] justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none    top-0">
            <div className='mt-20 p-2 bg-white md:w-1/2 rounded-lg pb-10'>
                  
                    <div className='pb-10 px-3 '> Your transaction  is being processed once it has been confirmed you will be emailed your ticket details</div>
                    <div className='text-center text-lg  mb-5'><button  className='w-30 bg-red-800 py-3 px-3 rounded text-white' onClick={get}>Back to home</button></div>
                   </div>
            </div>
            </div>

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
    </div>
  )
}

export default Pay