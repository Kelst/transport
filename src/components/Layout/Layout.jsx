import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Logo from '../../assets/logo.svg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

export default function Layout() {

  return (
    <div>
        <nav className='mx-2 bg-red-500 rounded-b-3xl shadow-red-200 shadow-2xl'>
        <ul  className='flex items-center' >
                <li className='text-white ml-10 mr-5 drop-shadow'><img className=' object-cover h-[100px] w-[140px] shadow-2xl rounded-2xl p-1 cursor-pointer' src={Logo} alt="" /></li>
                <h1 className='font-bold text-2xl text-gray-200 '>Транспорти </h1>
              
            </ul>
            
        </nav>

      <Outlet />

    </div>
  )
}
