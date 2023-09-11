import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify'

const Dashboard = () => {
    const [ticketName, setTicketName] = useState('');
    const [ticketPic, setTicketPic] = useState('');
    const [ticketPi, setTicketPi] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [ticketLocation, setTicketLocation] = useState('');

    const uri = "https://axc-tickets.onrender.com/users/verify"
    const navigate = useNavigate();
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
              
                alert(err.response.data.message)
                console.log(err)
                navigate("/signin")
            })
        
        
        
        }, [])
        
    , 1000);
    const handleImageChange = (e) => {
           const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            const result = reader.result
            setTicketPi(result)
        }
      };
      const postImage = () => {
        // console.log(files)
        let url = "https://axc-tickets.onrender.com/users/upload"
        axios.post(url, {files: ticketPi}).then((result)=>{
            console.log(result)
            setTicketPic(result.data.secure_url)
            alert("Ticket posted")
        }).catch((error)=>{
            console.log(error)
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        axios.post("https://axc-tickets.onrender.com/users/tick", {ticketName, ticketPic , ticketLocation}).then((res)=>{
            console.log(res)
            alert(res.data.message  )
        }).catch((err)=>{
          alert(err.response.data.message)
        })
    }
  return (
    <div>
        Dashboard
        <div>
            <h1>Add a Tickter</h1>
            <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Create a Ticket</h1>
      <form onSubmit={handleSubmit} className="max-w-md">
        <div className="mb-4">
          <label htmlFor="ticketName">Ticket Name</label>
          <input
            type="text"
            id="ticketName"
            value={ticketName}
            onChange={(e) => setTicketName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ticketPic">Ticket Picture</label>
          <input
            type="file"
            id="ticketPic"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <button type="button" onClick={postImage}>post</button>
        <div className="mb-4">
          <label htmlFor="ticketLocation">Ticket Location</label>
          <input
            type="text"
            id="ticketLocation"
            value={ticketLocation}
            onChange={(e) => setTicketLocation(e.target.value)}
            className="w-full border rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create Ticket
        </button>
      </form>
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

export default Dashboard