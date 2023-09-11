import React, { useEffect, useState } from 'react'

import { Outlet } from 'react-router-dom'
import Logo from '../../assets/logo.svg';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { Button } from '@mui/material';
import ModalFindTransport from '../Modal/ModalFindTransport';

export default function Layout() {
  const [show,setShow]=useState(false)
  const [flagAuth,setFlagAuth]=useState(false)
const handleShowFindForm=()=>{

setShow(true)

}


useEffect(()=>{
  const cookieData = Cookies.get('login');
      if (!cookieData) {
       setFlagAuth(true)
      }
     
 
},[]) 
  return (
    <div>
        <nav className='mx-2 bg-red-500 rounded-b-3xl shadow-red-200 shadow-2xl flex  justify-between items-center'>
        
        <ul  className='flex items-center' >
          
                <li className='text-white ml-10 mr-5 drop-shadow'><img className=' object-cover h-[100px] w-[140px] shadow-2xl rounded-2xl p-1 cursor-pointer' src={Logo} alt="" /></li>
                <h1 className='font-bold text-2xl text-gray-200 '>Транспорти </h1>
              
            </ul>
           <div onClick={handleShowFindForm} >  <SearchOutlinedIcon fontSize='large'  className='   justify-items-end  text-white  cursor-pointer mr-10'/></div> 
        </nav>
     {!flagAuth &&   <ModalFindTransport open={show} setOpen={setShow}/>}
      <Outlet />

    </div>
  )
}
