import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../styles/ForgotPass.css'
import { backEndUrl } from "../../../config";

export const ForgotPass = () => {
  const [hold, setHold] = useState(false);
  const [data, setData] = useState({
    userEmail: "",
  });
  const handleChange = (ele) => {
    const { name, value } = ele.target;
    setData({
      ...data,
      [name]: value,
    });
  };
  const handleSubmit = async (ele) => {
    setHold(true);
    ele.preventDefault();
    const newUser = await fetch(`${backEndUrl}/forgotPass`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (newUser.status === 401) {
        setHold(false);
        toast.error('Sorry, Invalid email', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    } else {
      setHold(false);
      toast.success("Email sent successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
    console.log(data);
    setData({
      userEmail: "",
    });
  };
  
  return (
<div className="forgot-container">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <h4 className="forgot-head">Forgot Password ? </h4>

      <form action="POST" onSubmit={handleSubmit} className="forgot-form">
        <h2>Notes</h2>
        <p className="forgot-para">
          Do not worry, Enter your email then you will get a link through your
          email from us. Click the link and reset your password.
        </p>
        <br />
        <br />
        <input
          type="text"
          name="userEmail"
          id="userEmail"
          value={data.userEmail}
          onChange={handleChange}
          required
          placeholder="Enter your email"
          className="forgot-in"
        />
        <br />
        <br />
        <button type="submit" className="forgot-btn">
          Send Email
        </button>
      </form>
      {hold && (
        <div className="forgot-hold">
          <div className="forgot-loading"></div>
            <p className="forgot-hold-p">Sending ...</p>
        </div>
      )}
    </div>
    
  );
};