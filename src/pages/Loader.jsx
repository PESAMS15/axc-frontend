import React from 'react'
import "../loader.css"

import LinearProgress from '@mui/material/LinearProgress';
// or
// import { LinearProgress } from '@mui/material';
const Loader = () => {
  return (
    <div id='loader'>
        <LinearProgress className='AppProgressBar' />
    </div>
  )
}

export default Loader