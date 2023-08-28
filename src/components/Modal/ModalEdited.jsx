import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "none",
  

  boxShadow: 24,
  p: 4,
};


export default function ModalEdited({ transport ,open,setOpen,listOfTransport,setListOfTransport,filtered,setFiltered}) {
  const [address, setAddress] = React.useState("");
  const [vlan, setVlan] = React.useState("");
  const [ip, setIp] = React.useState("");
  const [onu, setOnu] = React.useState("");
  const [port, setPort] = React.useState("");
  const [login, setLogin] = React.useState("");
  const [notification, setNotification] = React.useState("");

  function mackeEdited(data, id) {
    for (const prop in data) {
      if (  Array.isArray(data[prop])) {
        data[prop] = data[prop].map(item => {
          if(item.id==id){
            return {...item,adress:address,vlan:vlan,login:login,point_access:{ip:ip,onu:onu,port:port}}
          }
          else return item
        });
       }
    }
    return data;
  }
  const handleClose = () => setOpen(false);
const handleSave=()=>{
const editedDate=mackeEdited(listOfTransport,transport.id)
setListOfTransport(editedDate)
const newFiltered=filtered.map(item=>{
  if(item.id==transport.id){
                 return {...item,adress:address,vlan:vlan,login:login,point_access:{ip:ip,onu:onu,port:port}}

  } else return item
})
setFiltered(newFiltered)
setOpen(false);
}
  function checkFilds() {
    if (address != "" || notification != "" || login != "") {
      return true;
    } else return false;
  }
  useEffect(()=>{
    setAddress(transport.adress)
    setVlan(transport.vlan)
    setIp(transport.point_access.ip)
    setOnu(transport.point_access.onu)
    setPort(transport.point_access.port)
    setLogin(transport.login)
    setNotification(transport.notification)
  },[])
  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
       
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}  className=" rounded-xl">
            
            <div className="flex flex-col border-none outline-none gap-4">
              <TextField
                id="address"
                label="Адреса"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value);
                }}
              />
              <TextField
                id="login"
                label="логін"
                value={login}
                className=" w-80"
                onChange={(event) => {
                  setLogin(event.target.value);
                }}
              />
              <TextField
                id="vlan"
                label="Vlan"
                className=" w-60"
                value={vlan}
                onChange={(event) => {
                  setVlan(event.target.value);
                }}
              />
              <TextField
                id="ip"
                label="Ip"
                value={ip}
                className=" w-80"
                onChange={(event) => {
                  setIp(event.target.value);
                }}
              />
              <TextField
                id="onu"
                label="Onu"
                value={onu}
                className=" w-80"
                onChange={(event) => {
                  setOnu(event.target.value);
                }}
              />
              <TextField
                id="port"
                label="port"
                value={port}
                className=" w-80"
                onChange={(event) => {
                  setPort(event.target.value);
                }}
              />
              <TextField
                id="port"
                label="примітки"
                value={notification}
                multiline
                maxRows={6}
                onChange={(event) => {
                  setNotification(event.target.value);
                }}
              />
              {checkFilds() ? (
                <Button
                  variant="outlined"
                  startIcon={<SaveAsOutlinedIcon />}
                  onClick={handleSave}
                >  
                  Зберегти
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  startIcon={<SaveAsOutlinedIcon />}
                >
                  Зберегти
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
