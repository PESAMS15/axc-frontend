import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import Footer from './Footer'
import Loader from './Loader'

const Find = () => {
    const navigate = useNavigate()

    const route = useParams()
    const [pic, setpic] = useState("")
    const [scrolled, setScrolled] = useState(false);
    const [showInfo, setShowInfo] = useState(false);
    const [data, setdata] = useState(null)
    const [Data, setData] = useState(null)
    const [data2, setdata2] = useState(null)
    const [loader, setloader] = useState(false)

    const [data3, setdata3] = useState(null)
    const id = route.id
    useEffect(() => {
        axios.get(`https://axc-tickets.onrender.com/users/event/${id}`).then((res)=>{
            console.log(res)
            setdata(res.data)
            setTimeout(() => {
                run(res.data.owner)
                runn(res.data.owner, res.data.venue)
            }, 100);
            
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [])
    // console.log(data)
        const run = (owner)=>{
            
                axios.post(`https://axc-tickets.onrender.com/users/oneticket`, { id: owner}).then((res)=>{
                    // console.log(res)
                    setdata2(res.data)
                    setpic(res.data.ticketPic)
                }).catch((err)=>{
                    console.log(err)
                })
              
        
        }
        const runn = (owner, venue) =>{
            axios.post("https://axc-tickets.onrender.com/users/seat", {owner: owner, venue: venue}).then((res)=>{
                console.log(res)
                setdata3(res.data)
            })
        }
        // console.log(pic)

    useEffect(() => {
        const handleScroll = () => {
          if (window.scrollY > 0) {
            setScrolled(true);
          } else {
            setScrolled(false);
          }
        };
    
        window.addEventListener('scroll', handleScroll);
    
        // Clean up the event listener when the component unmounts
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
    //   console.log(data)
      const containerStyle = {
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: "darken",
        backgroundColor: "rgb(0,0,0,0.5)",
        width: '100vw',
        height: '56vh',
      };
     
    const fin = (el) =>{
        // alert(el)
        setShowInfo(!showInfo)
     
                setloader(true)
              // Make an API request using the provided ID to fetch the information
              axios.post(`https://axc-tickets.onrender.com/users/getseat`, {el: el}).then((response) => {
                setloader(false)
                console.log(response)
                setData(response.data);
              }).catch((err)=>{
                setloader(false)
                console.log(err)
              });
            
         
    }
    const pay = (id)=>{
        localStorage.setItem("id", id)
        localStorage.setItem("pic", pic)
        navigate(`/pay/${id}`)
    }
    const hide = ()=>{
        setShowInfo(false)
    }
  return (
   
    <div className='w-full overflow-x-hidden '>
        {/* hello {id} */}
        {loader? <Loader /> : ""}
        <div style={containerStyle} className={`  text-white  `}>
            <nav className={`w-full md:px-40 px-5 sticky flex justify-between   py-5  transition duration-300 top-0 ${  scrolled ? 'bg-white ' : 'bg-transparent text-white'}`}>
                <div className={` transition duration-500 container  ${scrolled? "text-blue-500": "text-white"}`}>
                    <h3 className='text-2xl font-serif font-semibold'><sup>AXC</sup> Tickets</h3>
                   
                </div>
               
            </nav>
            <p className='text-white mt-3 capitalize md:px-40 px-5'>Home / Available Concerts / {data && data.owner} tickets</p>
            <h1 className="font-bold md:mt-60 mt-52 capitalize md:px-40 px-5 md:text-5xl text-4xl ">{data && data.owner} Tickets</h1>

            {/* <img className='absolute -z-10 top-0 w-full h-1/3 md:h-1/2 overflow-hidden ' src={data && data.ticketPic} alt="" /> */}

        </div>
        <div className='md:ps-40 pe-2 lg:flex items-start px-3 justify-between w-screen py-6'>
            <div className='md:w-1/2'>
            <div className={`flex gap-5 items-center ${showInfo? "hidden" : ""}`}>
                <img src={data2 && data2.ticketPic} className='w-56 rounded h-32' alt="" />
                <div className=''>
                <h4 className='capitalize font-semibold text-blue-600 text-lg'> {data && data.owner} - {data && data.tour}</h4>
                <h4 className="text-gray-500 text-lg "><span className="uppercase">{data && data.consertMonth.slice(0, 3)} {data && data.concertDay} <span className="font-7xl">• </span> {data && data.time}:00 PM </span></h4>
                <h4 className="text-blue-500 text-lg font-medium">{data &&  data.venue}, {data && data.city}</h4>
                </div>
            </div>
            <div className='my-5'>
                
                {
                     showInfo && Data && (
                        <div className='shadow-lg font-medium md:static absolute top-0 left-0 bg-white z-50 w-full overflow-x-hidden h-full flex flex-col justify-between shadow-gray-500   p-3'>
                           <div>
                           <div className='py-3 md:block flex justify-end  border-b border-gray-400'>
                               <div className='w-2/3'> Sec { Data.section}, Row {Data.row}</div>

                               <div className="md:hidden" onClick={hide}>X</div>
                               
                           </div>
                           <div className='my-2 flex justify-between text-blue-500'> <div>Price:</div> ${Data.price}</div>
                           <div className='md:my-2 my-10 border-b py-2 border-gray-400'>description: </div>
                           <div className='my-2 font-medium '>Verified Resale Ticket</div>
                           </div>
                          
                           <div className="flex justify-end"><button onClick={()=> pay(Data._id)} className='px-3 w-full rounded my-3 p-2 bg-red-500 text-white '>Pay Now</button></div>

                        </div>
                      )
                }
                
            </div>
            </div>
            <div className="shadow-lg shadow-gray-300 me-4">
                <h4 className="font-semibold mb-5 text-2xl text-blue-500 md:w-96 px-3 mt-3">Available Tickets</h4>
                {data3 && data3.length  !==0? data3.map((el)=>(
                    <>
                        <div onClick={()=> fin(el._id)} className='flex justify-between p-2 hover:bg-blue-100 cursor-pointer py-5  border-b border-gray-400'>
                            <div className='font-medium'>
                                Sec {el.section}, Row {el.row}
                            </div>
                            <div className="font-semibold text-blue-500">
                                ${el.price.toFixed(2)}  
                            </div>
                        </div>
                    </>
                )): "No Tickets available"}
            </div>

           
        </div>
        <Footer />
    </div>
  )
}

export default Find