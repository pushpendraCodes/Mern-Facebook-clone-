import React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
const CoverPreview = ({ open, handleClose, cover_preview, handleSubmit }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <div>
        <Modal
          keepMounted
          open={open}
          onClose={handleClose}
          aria-labelledby="keep-mounted-modal-title"
          aria-describedby="keep-mounted-modal-description"
        >
          <Box sx={style}>
            <img className="cover_img" src={cover_preview} alt="preview" />
            <br />
            <div>
              <Button className="btn_update" onClick={handleSubmit}>
                update
              </Button>
              <Button className="btn_cancel" onClick={handleClose}>
                cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};

export default CoverPreview;
