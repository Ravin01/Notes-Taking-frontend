import { Navigate, Route, Routes } from "react-router-dom";
import "../../styles/AuthLayout.css";
import Login from "../../components/Login";
import Register from "../../components/Register";


const AuthLayout = () => {
  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1>Notes</h1>
        <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/*' element={<Navigate to='/Page404' />} replace/>
        </Routes>
      </div>
    </div>
  );
};

export default AuthLayout;
