import React, { useEffect, useState } from "react";
import CardTransport from "../CardTransport/CardTransport";
import ModalAddTransport from "../Modal/ModalAddTransport";
import useStore from "../../store";
import { Box, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel'
export default function Cards({ transportName }) {
  const [text, setText] = useState("");
  const [filter, setFilter] = useState(10);

  const handleChange = (event) => {
    setFilter(event.target.value);
   
  };
  const listOfTransport=useStore((state=>state.listOfTransport))
  let transportsCategory = useStore((state) =>
    state.getCategoryByName(transportName.name) 
  );
  const handleFind = (event) => {
    setText(event.target.value);
  };

  return (
    <>
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
        </Select>
      </FormControl>
    </Box>
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
            default:
              break;
          }
        })
        .map((e, i) => {
          return <CardTransport key={e._id} transport={e} />;
        })}
    </>
  );
}
