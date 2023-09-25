import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditIcon from '@mui/icons-material/Edit';
import Typography from "@mui/material/Typography";
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import ModalEdited from "../Modal/ModalEdited";
import DialogAlert from "../Dialog/DialogAlert";
import useStore from "../../store";
import Checkbox from '@mui/material/Checkbox';
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined';
import CachedOutlinedIcon from '@mui/icons-material/CachedOutlined';
import { FormControlLabel, FormGroup, Tooltip } from "@mui/material";
import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import LoaderData from "../loaderData/LoaderData";
export default function   CardTransport({ transport }) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [openInfo, setOpenInfo] = React.useState(false);
  const [depositChecked, setDepositChecked] = useState(false);
    const stopTransport=useStore(store=>store.stopTransport)
    const startTransport=useStore(store=>store.startTransport) 
    const loader=useStore(store=>store.loader)
    const deleteTransporta=useStore(store=>store.deleteTransport)
    const activateBilling=useStore(store=>store.activateBilling)
    const skipChecked=useStore(store=>store.skipChecked)
  
    const handleActiveBilling=()=>{
      activateBilling(transport._id,false)
    }
    const handleStopBilling=()=>{
     
      activateBilling(transport._id,true)
    }


  const handleChange = (event) => {
    skipChecked(transport._id,!transport.skip)
  };
  const handleStopLogin=()=>{
    stopTransport(transport._id,true)
  }
  const handleStartLogin=()=>{
    startTransport(transport._id,false)
  }
  const handleOpenEdited = () => setOpen(true);
const handleShowDialog=()=>  setOpenDialog(true)


const deleteTransport=()=>{
  deleteTransporta(transport._id)

}

  return (
    <Card className="mt-5 p-2 shadow-xl" variant="outlined">
                <DialogAlert textAlert={'Ви хочете видалити транспорт ?'} handlefunction={deleteTransport} setOpen={setOpenDialog} open={openDialog  } />

       <ModalEdited open={open} setOpen={setOpen}  
       transport={transport}
       
      
      
 /> 

      <div className="flex gap-2 ">
        <div className="bg-gray-50 p-2 flex-1 rounded-md">
          <Typography><span>Адреса:</span> {transport.adress}</Typography>
          <Typography><span>Login: </span>{transport.login}</Typography>
          
        </div>
        <div className="bg-gray-100 p-2 rounded-md flex-1 " >
         <Typography><span>Vlan:</span> {transport.vlan} </Typography>
          <Typography><span>Ip:</span> {transport.point_access.ip}</Typography>
          <Typography><span>Onu:</span> {transport.point_access.onu}</Typography>
          <Typography><span>Port:</span>{transport.point_access.port}</Typography>
        </div>
        <div className="bg-gray-200 p-2 flex-1 rounded-md">
         
          <Typography><span>Примітки:</span> {transport.notification}</Typography>

        </div>
      </div>
      <div className="border-t-2 mt-2 flex justify-between bg-gray-100">
      <div className="">
        <div>Інформація з білінгу:</div>
        
        <div className=" flex gap-1">Стан рахунку: <p className="font-bold text-md"> {transport.biling_info.deposit}</p></div>
        <div  className=" flex gap-1">Стан логіну billing: <p className="font-bold text-md">  {transport.biling_info.state}</p></div>
        <div className="flex gap-2 items-center">
          {
            transport.biling_info.disable==1|| transport.biling_info.disable==2
            ?  <Tooltip  title={"Активувати логін в білінгу"} placement="top"> <Button size="small" onClick={handleActiveBilling} disabled={transport.login==''}variant="outlined" startIcon={<PlayCircleFilledWhiteOutlinedIcon/>} >Активувати</Button></Tooltip>
            :
            <Tooltip  title={"Зупинити  логін білінг"} placement="top">   <Button size="small" onClick={handleStopBilling} disabled={transport.login==''}variant="outlined" startIcon={<PauseCircleOutlinedIcon/>} >Зупинити</Button></Tooltip>
          }
          {/* <Button size="small" disabled={transport.login==''}variant="outlined" startIcon={<CachedOutlinedIcon/>} >Обновити</Button> */}
          <FormGroup>
      <FormControlLabel control={<Checkbox checked={transport.skip} onChange={handleChange} />} label="Не вимикати якщо мінус" />

    </FormGroup>
        
        </div>
      </div>
      <div>
     
      </div>
        <div className="mt-2 flex gap-1 items-center">
  
        <Button className=""  onClick={handleShowDialog} variant="outlined" startIcon={<DeleteOutlinedIcon />}>
         Delete
        </Button>
        <Button variant="outlined" onClick={handleOpenEdited} startIcon={<EditIcon />}>
         Edit
        </Button>
        {

          transport.point_access.stop==false
          ? <Tooltip title={"Вимкнути порт на ону/світч"}  placement="top">
             <Button 
           disabled={transport.point_access.ip==''||(transport.point_access.onu==''&&transport.point_access.port=='')}
            variant="outlined" startIcon={<StopCircleOutlinedIcon />}
            onClick={handleStopLogin}
            >
          Stop
         </Button>   </Tooltip>
         :  <Tooltip  title={"Увімкнути порт на (ону/світч)"} placement="top">  
         <Button disabled={transport.point_access.ip==''||(transport.point_access.onu==''&&transport.point_access.port=='')}
          variant="outlined" 
          startIcon={<PlayCircleFilledWhiteOutlinedIcon />}
          onClick={handleStartLogin}
          >
         Start
        </Button> 
         </Tooltip>
        }
        
        
        
        </div>

      </div>
      {loader&&<LoaderData/>}
    </Card>
  );
}
