import React, { useState } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardTransport from "../CardTransport/CardTransport";
import { Button } from "@mui/material";
import ModalAddTransport from "../Modal/ModalAddTransport";
import SearchComponent from "../SearchComponent/SearchComponent";
import Cards from "../Cards/Cards";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
export default function TabsDisplay({ value, setValue, listOfTransport ,setListOfTransport}) {
  const transportName = Object.keys(listOfTransport);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 550,
        borderRadius:5,
        minWidth:1350
      }}
      
    >
             

      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        
        onChange={handleChange}
      
        sx={{ borderRight: 2, borderColor: "white",borderRadius:15,scrollbarColor:"red"}}
      >
        {transportName.map((e, i) => {
          return <Tab key={i} sx={{borderColor:'white'}} label={e} {...a11yProps({ i })} />;
        })}
        
      </Tabs>
      <div className=" m-auto ml-0 h-[650px] overflow-y-scroll w-[1300px]">
      {transportName.map((e,i) => {
        return (
            
          <TabPanel key={i}  value={value} index={i}>
          
            <div className="flex items-center justify-between">  
             <div></div>
           
               </div>
                {
                  listOfTransport[e].length==0?
                  <div>Немає нічого</div>:
                 <Cards transportName={e} transportCategory={ listOfTransport[e] } listOfTransport={listOfTransport} setListOfTransport={setListOfTransport}/>
                }
          </TabPanel>
        );
      })}
      </div>
    </Box>
  );
}
