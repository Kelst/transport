import React, { useEffect } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { TextField } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "none",
  

  boxShadow: 24,
  p: 4,
};
export default function ModalAddCategory({open,setOpen,setListOfTransport,listOfTransport}) {
  const [category, setCategory] = React.useState("");


  const handleClose = () => setOpen(false);
  const handleAddCategory=()=>{
    const onbj=listOfTransport;
    onbj[category]=[]
    setListOfTransport(onbj)
    setOpen(false)
  }
  function checkFilds() {
    if (category  != "" ) {
      return true;
    } else return false;
  }
 
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
                id="category"
                label="Назва"
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                }}
              />
            
              {checkFilds() ? (
                <Button
                  variant="outlined"
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                  onClick={handleAddCategory}
                >
                  додати
                </Button>
              ) : (
                <Button
                  disabled
                  variant="outlined"
                  onClick={handleAddCategory}
                  startIcon={<AddCircleOutlineOutlinedIcon />}
                >
                  додати
                </Button>
              )}
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
