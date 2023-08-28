import React, { useEffect, useState } from 'react'
import Buttom from '../Buttom/Buttom'
import TabsDisplay from '../TabsDisplay/TabsDisplay'
import fackeDate from '../../fackeDate';
import { Button, IconButton } from '@mui/material';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import ModalAddCategory from '../Modal/ModalAddCategory';

export default function Transport() {
   
  const [listOfTransport,setListOfTransport]=useState({})
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpenAddedCategory = () => setOpen(true);
  useEffect(()=>{
setListOfTransport(fackeDate) 
  },[])  
  return (
    <main className='m-auto w-[1300px] mt-5 flex items-start listOfTransport '>
      <ModalAddCategory open={open} setOpen={setOpen} setListOfTransport={setListOfTransport} listOfTransport={listOfTransport} />
<IconButton  onClick={handleOpenAddedCategory}className='bg-white' color="secondary">
  <AddCircleOutlineOutlinedIcon />
</IconButton>
      <TabsDisplay value={value} setValue={setValue} listOfTransport={listOfTransport } setListOfTransport={setListOfTransport}/>

    </main>
  )
}
