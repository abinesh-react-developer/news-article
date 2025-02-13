import React from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";

const ToastMessage = ({ type, message }) => {
  toast.dismiss()
  toast[type](
    <div style={{ display: "flex" }}>
      <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
        {message}
      </div>
    </div>,
    {
      autoClose: 8000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      limit: 1, 
    }
  );
  ToastMessage.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
   
  };
  ToastMessage.dismiss = toast.dismiss;
  toast.clearWaitingQueue();

}

export default ToastMessage;
