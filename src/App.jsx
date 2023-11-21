
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AuthLayout from './pages/auth/AuthLayout'
import HomeLayout from './pages/home/HomeLayout'
import ProtectedRoute from './ProtectedPage'
import {ForgotPass} from './pages/auth/ForgotPass'
import {ResetPass} from './pages/auth/ResetPass'
import Normal from './pages/NormalUsers/Normal'
import Page404 from './pages/NormalUsers/Page404'


function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route  path='/normalUser' element={<Normal />} />
      <Route path='/auth/*' element={<AuthLayout />} />
      <Route  path='/forgot' element={<ForgotPass />} />
      <Route path='/reset' element={<ResetPass />} />
      <Route path='/*' element={<ProtectedRoute element={<HomeLayout />} />} /> 
      <Route path='/page404' element={<Page404 />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
