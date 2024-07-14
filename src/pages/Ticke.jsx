import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Footer from './Footer'

const Ticke = () => {
    const [scrolled, setScrolled] = useState(false);
    const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    const [pic, setpic] = useState("")

    const [data, setdata] = useState(null)
    const [data2, setdata2] = useState(null)
    const route = useParams()
    const id = route.id
    const [loader, setloader] = useState(false)

    useEffect(() => {
        axios.post(`https://axc-tickets.onrender.com/users/oneticket`, {id}).then((res)=>{
            console.log(res)
            setdata(res.data)
            setpic(res.data.ticketPic)
        }).catch((err)=>{
            console.log(err)
        })
      
    }, [])

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
      console.log(data)
      const containerStyle = {
        backgroundImage: `url(${pic})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: "darken",
        backgroundColor: "rgb(0,0,0,0.5)",
        width: '100vw',
        height: '56vh',
      };
      useEffect(() => {
        setloader(true)
        let uri = "https://axc-tickets.onrender.com/users/events"
      axios.post(uri, { id}).then((res)=>{
        setloader(false)
        console.log(res)
        setdata2(res.data)
      }).catch((err)=>{
        setloader(false)
        console.log(err)
      })
      }, [])
      console.log(data2)

   

  return (
    <div className='overflow-x-hidden'>
      {loader? <Loader /> : ""}
       <div style={containerStyle} className={` text-white px-3  h-screen bg-center bg-cover `}>
            <nav className={`w-full sticky top-0 left-0 flex justify-between  md:px-40 px-5  py-5  transition duration-300  ${  scrolled ? 'bg-white ' : 'bg-transparent text-white'}`}>
                <div className={` transition duration-500 container  ${scrolled? "text-blue-500": "text-white"}`}>
                    <h3 className='text-2xl font-serif font-semibold'><sup>AXC</sup> Tickets</h3>
                </div>
                
            </nav>
            <p className='text-white mt-3 capitalize md:px-40'>Home / Available Concerts / {id} tickets</p>
            <h1 className="font-bold md:mt-60 mt-52 capitalize md:px-40 md:text-5xl text-4xl ">{id} Tickets</h1>

            {/* <img className='absolute -z-10 top-0 w-full h-1/3 md:h-1/2 overflow-hidden ' src={data && data.ticketPic} alt="" /> */}

        </div>
        <div className="md:px-40">
            <h1 className='font-semibold px-4'>EVENTS</h1>
            <div className="shadow-xl shadow-zinc-400 mt-10  w-full p-3">
              {data2?  data2.map((el)=>{
               if (data2.length < 0){
                return (
                  <>
                    <h3>No events Available</h3>
                  </>
                )
               }else{
                // const monthIndex = months.findIndex(month => month === el.consertMonth.toLowerCase());
                // const date = new Date();
                // console.log(monthIndex)
                
                // date.setMonth(monthIndex);
                const word = 'ExampleWord'; // Replace with your word
                const firstThreeLetters = el.consertMonth.slice(0, 3);
                console.log(firstThreeLetters)
                
                // const abbreviatedMonth = date.toLocaleString('default', { month: 'short' });
                return (
                  <>
                      <div className='flex  justify-between w-full border-b border-gray-400 p-4'>
                        <div className="flex gap-10">
                          <div className='flex flex-col items-center justify-center'>
                            <div className="uppercase font-medium text-xl">{firstThreeLetters}</div>
                            <div className='font-medium'>{el.concertDay}</div>
                          </div>
                          <div>
                              <div className='text-gray-600 font-normal text-md'>{el.time}:00 PM</div>
                              <div className='font-medium text-lg'>{el.city}, {el.venue}</div>
                          </div>
                        </div>
                        <Link to={`/events/${el._id}`}><button className='md:px-3 px-4 p-2 flex  gap-2 md:rounded rounded-full bg-gray-600 font-medium hover:bg-gray-700 text-white'><span className='md:flex hidden'>Find tickets</span> > </button></Link>

                      </div>
                  </>
                )
              
               }
              }): "No Events available"}
            </div>

        </div>
        <Footer />

    </div>
  )
}

export default Ticke