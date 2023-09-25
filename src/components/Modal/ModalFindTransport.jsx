import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
    import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SaveAsOutlinedIcon from '@mui/icons-material/SaveAsOutlined';
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { FormControl, TextField } from "@mui/material";
import useStore from "../../store";
import CardTransport from "../CardTransport/CardTransport";
import { Box, InputLabel, MenuItem, Select, } from "@mui/material";
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
  const [flagAuth, setFlagAuth] = React.useState(false)

const findTransportByFild=useStore(state=>state.findTransportByFild)
const findTransport=useStore(state=>state.findTransport)
const [filter, setFilter] = useState(10);
 
const handleClose = () => setOpen(false);
const handleEnter=(e)=>{
    if (e.keyCode === 13) {
    findTransportByFild(search,filter)}
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
            <div className="flex justify-center items-center">
             <TextField fullWidth={true} onKeyDown={handleEnter} value={search} onChange={handleSearch}  label={"пошук"} variant="standard"/>
        <FormControl >
        <InputLabel id="demo-simple-select-label">Фільтр</InputLabel> 
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
        
      </FormControl>:<div></div> 
      </div>
           <div className="h-[600px]  overflow-y-auto">
            {
                findTransport.map(e=>{
                    return <CardTransport transport={e}/>
                })
            }
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
