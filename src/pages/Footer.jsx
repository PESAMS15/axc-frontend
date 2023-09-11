// Footer.js
import React from 'react';
import { Link } from 'react-router-dom';


function Footer() {
  return (
    <footer className="bg-gray-900 py-5 w-full  text-white">
      <div className="container px-3 md:px-40 py-2 mx-auto  border-b-2  border-slate-600 flex justify-between">
        <h3 className='text-2xl font-serif text-blue-500 mb-5 font-semibold'><sup>AXC</sup> Tickets</h3>
        
      </div>
      <div className='flex flex-col md:flex-row gap-4 justify-between text-xs px-3   my-5 md:px-40'>
          <div><Link to="/purchase"> Purchase Policy </Link > &nbsp;|&nbsp; <Link to="/privacy"> Privacy Policy </Link> &nbsp;|&nbsp; <Link to="/cookies"> Manage my cookies </Link></div>
          <div>© 2023 AXC Tickets. All rights reserved.</div>
      </div>
    </footer>
  );
}

export default Footer;
