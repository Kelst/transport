import React, { useEffect, useState } from 'react'
import Buttom from '../Buttom/Buttom'
import TabsDisplay from '../TabsDisplay/TabsDisplay'
import fackeDate from '../../fackeDate';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalAddCategory from '../Modal/ModalAddCategory';
import useStore from '../../store';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
export default function Transport() {
  const getAllTransport=useStore((state)=>state.getAllTransport)
  const getAllCategory=useStore((state)=>state.getAllCategory)
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpenAddedCategory = () => setOpen(true);
  const navigate=useNavigate()
  useEffect(()=>{
    getAllCategory() 
    
    const cookieData = Cookies.get('login');
        if (!cookieData) {
          navigate("/login") 
        }
       
   
  },[])  
  return (
    <main className='m-auto w-[1300px] mt-5 flex items-start listOfTransport '>
      <ModalAddCategory open={open} setOpen={setOpen} />
    
<IconButton  onClick={handleOpenAddedCategory}className='bg-white' color="secondary">
  <AddCircleOutlineOutlinedIcon />
</IconButton>
      <TabsDisplay value={value} setValue={setValue} />
    
    </main>
  )
}
