import React  from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Footer from './Footer';
// import { set } from 'mongoose';
const Home = () => {
    const [scrolled, setScrolled] = useState(false);
    const [arr, setarr] = useState(null)
    const [logined, setlogined] = useState(false)
    const uri = "https://axc-tickets.onrender.com/users/verify"
    //
    const token = localStorage.getItem("token")
    useEffect(() => {
      axios.get(uri, {
          headers: {
              Authorization: `bearer ${token}`
          }
      }).then((res) => {
          // toast.success(res.data.message)
          setlogined(true)
      })
      .catch((err) => {
          setlogined(false)
      })
  }, [])
  // console.log(logined)


  const scrolle = () => {
    window.scroll({
      top: 1000,
      left: 0,
      behavior: 'smooth'
    });
  }
  

    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 0) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };

     
    // console.log(token)
    
      
    
   

  
      window.addEventListener('scroll', handleScroll);
  
      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);
    useEffect(() => {
      let url = "https://axc-tickets.onrender.com/users/alltick"
      axios.get(url).then((res)=>{
          // console.log(res)
          setarr(res.data.tickets)
      }).catch((err)=>{
          console.log(err)
      })
    }, [])
    localStorage.setItem("route", "/")
    // console.log(arr)
  return (
    <div className=''>
        <div className={`bg-[url('./Assets/wp3203900.webp')] bg-blend-darken bg-[rgb(0,0,0,0.5)]  h-screen bg-center bg-cover `}>
            <nav className={`w-full sticky flex justify-between  items-center p-1x  md:px-20 py-5  transition duration-300 top-0 ${  scrolled ? 'bg-white ' : 'bg-transparent text-white'}`}>
                <div className={` transition duration-500  ps-2  ${scrolled? "text-blue-500": "text-white"}`}>
                    <h3 className='text-2xl font-serif font-semibold'><sup>AXC</sup> Tickets</h3>
                   
                </div>
                <div className='flex'>
                <div className={` w-28 ${logined? "hidden": ""} `}><Link to="/signin" className={` rounded-xl ${logined? "hidden": ""} font-semibold p-2 px-3 ${scrolled?  "bg-gray-600 text-white ": "bg-blue-500 text-white-500"}`}>Sign In</Link></div>
                <div className={` w-28 ${logined? "hidden": ""} `}><Link to="/signup" className={` rounded-xl  ${logined? "hidden": ""} font-semibold p-2 px-3 ${scrolled?  "bg-blue-500 text-white ": "bg-gray-600 text-white"}`}>Sign Up</Link></div>
                <div onClick={scrolle} title='Available concerts' className={`  ${logined? "": "hidden"}  rounded-full cursor-pointer  text-2xl  font-bold p-2 px-5  ${scrolled?  "bg-blue-500  text-white ": "bg-gray-600 text-white"}`}>C</div>
                </div>
                {/* <div  className={`border   rounded p-2 w-1/4 ${scrolled? "border-gray-400": "border-white"}`}>
                    <input  placeholder='Search for your desired ticket' type="text" className={`outline-none bg-transparent w-full ${scrolled? "placeholder:text-gray-400": "placeholder:text-gray-300"} `} />
                </div> */}
            </nav>
            <div className="mt-40 md:px-40 px-3">
                <h1 className='font-semibold md:text-7xl md:w-1/2 w-full text-center md:text-left text-5xl text-white'>Let's make Live possible for you.</h1>
                <h5 className='text-white md:w-1/3 text-center md:text-left font-medium my-4  text-xl md:text-2xl'>Get your Tickets for your favourite concerts here at cheap and affordable prices.</h5>
                <div className="">
                  <button className='px-7 w-full md:w-64   font-semibold py-3  text-2xl rounded-3xl text-white bg-gray-600 my-5' >


                {logined? <> <button onClick={scrolle} className='w-full'>Available Concerts</button> </> : <Link to="/signup">Get Started</Link>}
                  </button>
                </div>
            </div>
        </div>
        <div className="py-5 px-3 md:px-20">
            <h2 className='md:text-3xl text-2xl'>Available Concerts</h2>
            <div className="md:flex my-6 gap-5">
            {arr? arr.map((el)=>(
                <>
                   <Link to={`/${el.ticketName}`}>
                   <div className="relative my-3">
                    <img className='w-full md:w-60 h-32 rounded' src={el.ticketPic} alt="" />
                    <div className="absolute bg-gray-900 p-2 bg-opacity-70 font-semibold bottom-4 text-white left-5">{el.ticketName} </div>
                    </div>
                    </Link>
                </>
            )) : "no tickets available"}
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Home