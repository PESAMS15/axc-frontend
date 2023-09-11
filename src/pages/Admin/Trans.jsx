import React from 'react'
import axios from 'axios'

axios.get("https://axc-tickets.onrender.com/users/trans").then((res=>{
    console.log(res)
    
})).catch((err)=>{
    console.log(err)
})



const Trans = () => {
  return (
    <div>
        <h1 className="text-center">Transactions</h1><br/>
        


    </div>
  )
}

export default Trans