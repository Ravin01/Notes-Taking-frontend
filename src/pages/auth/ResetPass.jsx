import { useState } from "react";
import { Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../styles/ResetPass.css'
import { backEndUrl } from "../../../config";

export const ResetPass = () => {
  const [reset, setReset] = useState(false)
  const [data, setData] = useState({
    userEmail : '',
    password : ''
})
const handleChange = (ele)=>{
    const {name, value} = ele.target;
    setData({
        ...data, [name] : value
    })
}
const handleSubmit = async(ele) => {
    ele.preventDefault()
    const newUser = await fetch(`${backEndUrl}/resetPass`,{
        method : 'POST',
        body : JSON.stringify(data),
        headers : {
            'Content-Type' : 'application/json'
        }
    })
    if(newUser.status === 500){
      toast.error('Error', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }else{
      toast.success("Password Reset successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      setReset(true)
    }

    console.log(data)
    setData({
        userEmail : '',
        password : '' 
    })
}
if(reset == true){
  return <Navigate to={'/mail'} />
}
  return (
    <div className="reset-container">
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
      <h4 className="reset-head">Reset Password</h4>
      <form action="POST" onSubmit={handleSubmit} className="reset-form">
      <h2 className="reset-logo" >Notes</h2>
        <input type="text" name="password" id="password" value={data.password} onChange={handleChange} required placeholder="Enter your new Password" className="reset-in"/>
        <br />
        <br />
        <button type="submit" className="reset-btn" >Submit</button>
    </form>
    </div>
    
  )
}