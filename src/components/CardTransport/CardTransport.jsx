import React from "react";
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

function removeItemByIdFromObject(data, id) {
  

  for (const prop in data) {
    if (  Array.isArray(data[prop])) {
      data[prop] = data[prop].filter(item => item.id !== id);
     }
  }
  return data;
}

export default function CardTransport({ transport ,listOfTransport,setListOfTransport,filtered,setFiltered}) {
  const [open, setOpen] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const handleOpenEdited = () => setOpen(true);
  
const handleShowDialog=()=>  setOpenDialog(true)
const deleteTransport=()=>{
const newObj=removeItemByIdFromObject(listOfTransport,transport.id)
console.log(newObj);
const newFiltered=filtered.filter(e=>e.id!=transport.id)

setListOfTransport(newObj)
setFiltered(newFiltered)
}

  return (
    <Card className="mt-5 p-2" variant="outlined">
            <DialogAlert textAlert={'Ви хочете видалити транспорт ?'} handlefunction={deleteTransport} setOpen={setOpenDialog} open={openDialog  } />

      <ModalEdited open={open} setOpen={setOpen}  
       transport={transport}
       listOfTransport={listOfTransport} 
       setListOfTransport={setListOfTransport}
        filtered={filtered}
        setFiltered={setFiltered} />

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
      <div className="border-t-2 mt-2 flex justify-between">
      <div>
        <div><span>Інформація з білінгу:</span> </div>
        <div><span>Стан рахунку:</span></div>
        <div><span>Стан логіну:</span></div>
          
      </div>
        <div className="mt-2 flex gap-1 items-end">
  
        <Button className=""  onClick={handleShowDialog} variant="outlined" startIcon={<DeleteOutlinedIcon />}>
         Delete
        </Button>
        <Button variant="outlined" onClick={handleOpenEdited} startIcon={<EditIcon />}>
         Edit
        </Button>
        <Button variant="outlined" startIcon={<StopCircleOutlinedIcon />}>
         Stop
        </Button>  
        
        </div>

      </div>
    </Card>
  );
}
