import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css"

import reportWebVitals from './reportWebVitals';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import Dashboard from './pages/Admin/Dashboard';
import CreateConcert from './pages/Admin/Tickets';
import CreateSeat from './pages/Admin/Seats';
import Home from './pages/Home';
import Ticke from './pages/Ticke';
import Find from './pages/Find';
import Pay from './pages/Pay';
import Privacy from './pages/Privacy';
import Purchase from './pages/Purchase';
import Cookies from './pages/Cookies';
import Trans from './pages/Admin/Trans';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/signin' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/concerts' element={<CreateConcert />} />
          <Route path='/pay/:id' element={<Pay />} />
          <Route path='/seats' element={<CreateSeat />} />
          <Route path='/:id' element={<Ticke />} />
          <Route path='/privacy' element={<Privacy />} />
          <Route path='/purchase' element={<Purchase />} />
          <Route path='/cookies' element={<Cookies />} />
          <Route path='/trans' element={<Trans />} />
          <Route path='/events/:id' element={<Find />} />
        </Routes>
      </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
