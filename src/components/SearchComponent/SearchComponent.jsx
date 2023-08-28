import { TextField } from '@mui/material'
import React, { useState } from 'react'

export default function SearchComponent({setListofTransport,transportCategory}) {
    const [text,setText]=useState("")
    const handleFind=(event)=>{
        setText(event.target.value)
    const findText=transportCategory.filter(e=>{
        if(e.adress.toLowerCase().includes(text) ){
            return e
        }
        if(e.login.toLowerCase().includes(text) ){
            return e
        }
        if(e.point_access.onu.toLowerCase().includes(text) ){
            return e
        }
        if(e.point_access.ip.toLowerCase().includes(text) ){
            return e
        }
        
        

    })

    setListofTransport(findText)
    }
  return (
    <div className='mt-[-60px]'>
        <TextField value={text} label="Search" onChange={handleFind} variant="standard" /> 
    </div>
  )
}
