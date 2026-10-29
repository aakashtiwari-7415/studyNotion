import React from 'react'
import {Routes,Route} from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
 import Navbar from './component/common/Navbar';
import SingUp from './pages/SingUp';
import ForgetPassword from './pages/ForgetPassword';
import SendOtp from './pages/SendOtp';
import VerifyEmail from './pages/VerifyOtp';
import UpdatePassword from './pages/UpdatePassword';
import About from './pages/About';
import ContactUsForm from './component/ContectPage/ContactUsForm';
import ContactUs from './pages/ContactUs';

const App = () => {
  return (
    <div className='bg-richblack-900'>
      <Navbar/>
      
    
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/login" element={<Login />} />

        <Route path="/signup" element={<SingUp/>}/>

        <Route path='/forgetpassword' element={<ForgetPassword/>}/>
        <Route path='/sendotp' element={<SendOtp/>}/>
        <Route path='/verifyotp' element={<VerifyEmail/>}/>
        <Route path='/UpdatePassword' element={<UpdatePassword/>} />
        <Route path='/About' element={<About/>}/>
        <Route path='/contact' element={<ContactUs/>}/>
      </Routes>
    </div>
  )
}

export default App





