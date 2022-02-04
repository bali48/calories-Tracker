import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ErrorNotice(props) {
  console.log("coming inside error", props);
  return (
    // <div className="error-notice">
    //   <span>{props.message}</span>
    //   <button onClick={props.clearError}>X</button>
    // </div>
    <div>
      <button onClick={props.message}>Notify!</button>
      <ToastContainer />
    </div>
  );
}
