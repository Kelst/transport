import React, { useEffect, useState } from "react";
import CardTransport from "../CardTransport/CardTransport";
import ModalAddTransport from "../Modal/ModalAddTransport";
import useStore from "../../store";
import { Box, Checkbox, InputLabel, MenuItem, Select, Switch, TextField,Button, Tooltip } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
import LoaderData from "../loaderData/LoaderData";
export default function Cards({ transportName }) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState(10);
  const [checked, setChecked] = React.useState(false);
  const loader=useStore(store=>store.loader)
  const checkBilling=useStore(store=>store.checkBilling)
  const handleCheckBilling = async()=>{
   
   await  checkBilling()
  }
  const handleChange = (event) => {
    setFilter(event.target.value);
   
  };
  const getIdCategoryByName=useStore((state=>state.getIdCategoryByName))
  let transportsCategory = useStore((state) =>
    state.getCategoryByName(transportName.name) 
  ); 
  const handleChangeToogle =async (event) => {
    setChecked(event.target.checked);
    await getIdCategoryByName(transportName.name,event.target.checked)
    
  };
  const handleFind = (event) => {
    setText(event.target.value);
  };

  return (
    <>
    
    <div className="sticky top-1  z-50 bg-white p-3">
      <div className="flex justify-between">
        <div></div>
        <ModalAddTransport transportName={transportName} />
      </div>

      <div className="mt-[-60px] flex gap-10 items-center ">
        <TextField
          value={text}
          label="Search"
          onChange={handleFind}
          variant="standard"
        />
        
 <Box sx={{ minWidth: 110,minHeight:5 }}    className="mt-4 " > 
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Фільтр</InputLabel> 
        <Select
          className="h-10"
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={filter}
          label="Фільтр"
          variant="outlined"
          onChange={handleChange}
        >
          <MenuItem value={10}>Всі</MenuItem>
          <MenuItem value={20}>Активні</MenuItem>
          <MenuItem value={30}>Зупинені (виключений порт) </MenuItem>
          <MenuItem value={40}>Зупинені (білінг) </MenuItem>
          <MenuItem value={50}>Мінус на рахунку </MenuItem>
          <MenuItem value={60}>Без логіну</MenuItem>
          <MenuItem value={70}>Без обладнання</MenuItem>
        </Select>
      </FormControl>
    </Box>
    <FormControlLabel className="mt-4" 
     control={<Switch 
      checked={checked}
      onChange={handleChangeToogle}
      inputProps={{ 'aria-label': 'controlled' }}
      color="warning" />} 
     label=" якщо мінус" />
     <div className="mt-4 " >
      <Button onClick={handleCheckBilling}  > <Tooltip title="Update from Billing">Update</Tooltip>  </Button> 
     </div>
    
      </div>
      
      </div>
      {transportsCategory
        .filter((e) => {
          if (e.adress.toLowerCase().includes(text.trim())) {
            return e;
          }
          if (e.login.toLowerCase().includes(text.trim())) {
            return e;
          }
          if (e.point_access.onu.toLowerCase().includes(text.trim())) {
            return e;
          }
          if (e.point_access.ip.toLowerCase().includes(text.trim())) {
            return e;
          }
          if (e.vlan.includes(text.trim())) {
            return e;
          }
        })
        .filter(e=>{
          switch (filter) {
            case 10:
              return e
              break;
            case 20:
              return e.biling_info.disable==0
              break;
            case 30:
              return e.point_access.stop==true
              break
              case 40:
                return e.biling_info.disable==1
                break
                case 50:
                  return e.biling_info.deposit<0
                  break
                  case 60:
                    return e.biling_info.exist==false
                    break
                    case 70:
                      return e.point_access.ip==''
                      break
            default:
              break;
          }
        })
        .map((e, i) => {
          return <CardTransport key={e._id} transport={e} />;
        })}
        {loader&&<LoaderData/>}
    </>
  );
}
