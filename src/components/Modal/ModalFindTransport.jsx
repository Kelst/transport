import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
    import Modal from "@mui/material/Modal";
    import LoadingButton from '@mui/lab/LoadingButton';

import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { FormControl, TextField, Tooltip } from "@mui/material";
import useStore from "../../store";
import CardTransport from "../CardTransport/CardTransport";
import { Box, InputLabel, MenuItem, Select, } from "@mui/material";
import LoaderData from "../loaderData/LoaderData";
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


export default function ModalFindTransport({ transport,open,setOpen}) {
  const [search, setSearch] = React.useState("");
  const [flagLoader, setFlagLoader] = React.useState(false)

const findTransportByFild=useStore(state=>state.findTransportByFild)
const findTransport=useStore(state=>state.findTransport)
const getTransport=useStore(state=>state.getTransport)
const setFindTransport=useStore(state=>state.setFindTransport)

const loader=useStore(state=>state.loader)
const [filter, setFilter] = useState(10);
 
const handleClose = () => { 
  setFindTransport()
  setOpen(false)};
const handleEnter= async(e)=>{
    console.log(loader)
  await  findTransportByFild(search,filter)

}
const handleGetAll=async()=>{
 await getTransport()
}
const handleSearch=(e)=>{
    setSearch(e.target.value)
    // clearTimeout(searchTimeout);
    // searchTimeout = setTimeout(() => {
    //     findTransportByFild(search,filter)
    //   }, 2000);
  

} 

const handleChangeFilter = (event) => {
    setFilter(event.target.value);
        findTransportByFild(search,event.target.value)

  };
 let searchTimeout;
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
          <Box sx={style}   className=" rounded-xl flex  justify-center flex-col">
            <div className="flex justify-center items-center gap-5">
             <TextField className=" w-[500px]"  value={search} onChange={handleSearch}  label={"пошук"} variant="standard"/>
             
             <LoadingButton
        loading={loader}
        loadingPosition="start"
        onClick={handleEnter}
        variant="outlined"
      >
        Пошук
      </LoadingButton>
      <LoadingButton
        loading={loader}
        loadingPosition="start"
        onClick={handleGetAll}
        variant="outlined"
      >
        Всі
      </LoadingButton>
      
        <FormControl >
        <InputLabel id="demo-simple-select-label">Фільтр</InputLabel> 
        <Tooltip title={`Кількість: ${findTransport.length}`}>
       <Select
          className="h-10"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Фільтр"
          variant="outlined"
          onChange={handleChangeFilter}
        >
          <MenuItem value={10}>Всі</MenuItem>
          <MenuItem value={20}>Активні</MenuItem>
          <MenuItem value={30}>Зупинені (виключений порт) </MenuItem>
          <MenuItem value={40}>Зупинені (білінг) </MenuItem>
          <MenuItem value={50}>Мінус на рахунку </MenuItem>
          <MenuItem value={60}>Без логіну</MenuItem>
          <MenuItem value={70}>Без обладнання</MenuItem>
        </Select>
        </Tooltip>
      </FormControl><div></div> 
      </div>
           <div className="h-[600px]  overflow-y-auto">
            {
                findTransport.map((e,id)=>{
                    return <CardTransport key={id} transport={e}/>
                })
            }
            </div>
          </Box>
        </Fade> 
       
      </Modal>
     
    </div>
  );
}
