// import { Link, useNavigate } from 'react-router-dom'
// import CTAButton from '../HomePage/Button'
// import { useDispatch } from 'react-redux';
// import { useState } from 'react';
// import { login } from '../../../services/operations/authAPI';
// import { AiOutlineEyeInvisible } from "react-icons/ai";
// import { IoEyeOutline } from "react-icons/io5";


// const LoginForm = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const[formData ,setFormData] = useState({
//     email:"",
//     password:"",
//   })

//   const [showPassword , setShowPassword] =useState(false);

//   const {email , password} = formData;

//   const handleOnChenge = (e) =>{
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]:e.target.value,
//     }))
//   }
//   const handleOnSubmit = (e) => {
//     e.preventDefault()
//     dispatch(login(email,password,navigate))
//   }


//   return (
//     <form
//       onSubmit={handleOnSubmit}
//       className='flex flex-col gap-5'>
//       <label>
//         <p  className='text-richblack-5 text-[15px] mb-2 '>Email Address <sup className='text-pink-300'>*</sup></p>
//         <input
//         type='email'
//         name="email"
//         value={email}
//         onChange={handleOnChenge}
//         placeholder='Enter email address'
//         style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//         }}
//         className='p-[12px] h-[48px] w-full bg-richblack-800 rounded-md text-richblack-5'/>
//       </label>

//       <label className='relative'>
//         <p className='text-richblack-5 text-[15px] mb-1'>Password <sup className='text-pink-300'>*</sup></p>
//         <input
//         type={showPassword ? "text" : "password"}
//         name='password'
//         value={password}
//         onChange={handleOnChenge}
//         placeholder='Enter Password'
//         style={{
//             boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
//         }}
//         className='p-[12px] h-[48px] w-full bg-richblack-800 rounded-md text-richblack-5'/>

//         <button onClick={() => setShowPassword((prev) => !prev)}
//                               className='absolute  top-9 right-3 text-richblack-5'>
//                               {showPassword ?
//                               (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
//                               (<IoEyeOutline fontSize={24} fill='#AFB2BF'/>)}
//         </button>
//       </label>
        
//       <Link to="/forgetpassword" 
//        className='text-blue-300 font-edu-sa text-right mt-[-14px]'><span>Forgot password</span></Link>

//       <CTAButton active={true} type='submit'>
//         <p className='text-[15px] font-semibold'>Log In</p>
//       </CTAButton>
//     </form>
//   )
// }

// export default LoginForm





import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { toast } from "react-hot-toast";
import CTAButton from "../HomePage/Button";
import { login } from "../../../services/operations/authAPI";

import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  // Input handling
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // Form submission
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    dispatch(login(email,password,navigate))
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="flex flex-col gap-5"
    >
      {/* Email */}
      <label>
        <p className="text-richblack-5 text-[15px] mb-2">
          Email Address{" "}
          <sup className="text-pink-300">*</sup>
        </p>

        <input
          type="email"
          name="email"
          value={email}
          onChange={handleOnChange}
          placeholder="Enter email address"
          autoComplete="email"
          required
          className="p-[12px] h-[48px] w-full bg-richblack-800 rounded-md text-richblack-5"
          style={{
            boxShadow:
              "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />
      </label>

      {/* Password */}
      <label className="relative block">
        <p className="text-richblack-5 text-[15px] mb-2">
          Password{" "}
          <sup className="text-pink-300">*</sup>
        </p>

        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={password}
          onChange={handleOnChange}
          placeholder="Enter Password"
          autoComplete="current-password"
          required
          className="p-[12px] h-[48px] w-full bg-richblack-800 rounded-md text-richblack-5 pr-12"
          style={{
            boxShadow:
              "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
          }}
        />

        {/* Eye button: must not submit the form */}
        <button
          type="button"
          onClick={() =>
            setShowPassword((prev) => !prev)
          }
          aria-label={
            showPassword ? "Hide password" : "Show password"
          }
          className="absolute top-9 right-3 text-richblack-5"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible
              size={24}
              color="#AFB2BF"
            />
          ) : (
            <IoEyeOutline
              size={24}
              color="#AFB2BF"
            />
          )}
        </button>
      </label>

      {/* Forgot Password */}
      <div className="text-right mt-[-14px]">
        <Link
          to="/forgetpassword"
          className="text-blue-300 font-edu-sa"
        >
          Forgot password?
        </Link>
      </div>

      {/* Login Button */}
      <button
        type="submit"
        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px[12px]
        font-medium text-richblack-900"
      >
        <p className="text-[15px] font-semibold">
          {loading ? "Logging in..." : "Log In"}
        </p>
      </button>
    </form>
  );
};

export default LoginForm;
