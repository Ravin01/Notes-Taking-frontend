/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import "../styles/Login.css";
import { Link, Navigate } from "react-router-dom";
import { backEndUrl } from "../../config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [input, setInput] = useState({
    userEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };
  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      e.preventDefault();
      const newUser = await fetch(`${backEndUrl}/login`, {
        method: "POST",
        body: JSON.stringify(input),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const userData = await newUser.json();
      
      setLoading(false);
      if (newUser.status === 401) {
        toast.error("Invalid Password", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      } else if (newUser.status === 403) {
        toast.error("User not yet registered", {
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
        sessionStorage.setItem("user", JSON.stringify(userData));
      }
      setInput({
        userEmail: "",
        password: "",
      });
    } catch (err) {
      console.log(err);
    }
  };
  if (
    sessionStorage.getItem("user") &&
    JSON.parse(sessionStorage.getItem("user"))
  ) {
    return <Navigate to={"/home"} replace />;
  }
  return (
    <div className="login-container">
      <h2>Welcome Back !</h2>
      <form action="" onSubmit={handleSubmit} className="form-container">
        <input
          type="email"
          placeholder="Enter your email"
          name="userEmail"
          id="userEmail"
          required
          onChange={handleChange}
          value={input.userEmail}
        />
        <input
          type="password"
          placeholder="Enter your Password"
          name="password"
          id="password"
          required
          onChange={handleChange}
          value={input.password}
        />
        <p className="login-form-link">
          Forgot Password ?{" "}
          <Link
            to={"/forgot"}
            style={{
              textDecoration: "none",
              color: "rgb(55, 55, 240)",
              fontSize: "15px",
            }}
          >
            Click here
          </Link>
        </p>
        <button type="submit">Login</button>
      </form>
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
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div className="login-loader-con">
            <p>Checking</p>
            <div className="login-loader"></div>
          </div>
        </div>
      )}
      <div className="form-link">
        <p>Don't have an Account ? </p>
        <Link to="/auth/register" className="form-link-register">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Login;
