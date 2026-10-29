import {toast} from "react-hot-toast"
import CTAButton from '../HomePage/Button'
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { IoEyeOutline } from "react-icons/io5";
import { useState } from 'react';
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../../../slice/authSlice";
import { sendOtp, signup } from "../../../services/operations/authAPI";


const SignupForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword , setShowPassword]  = useState(false);
  const [showConfirmPassword , setShowConfirmPassword] = useState(false);

  //student or instructor
  const [accountType , setAccountType] =  useState(ACCOUNT_TYPE.STUDENT)

  const [formData , setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword: "",
    phone:""
  })

  //handle input fields , when some value changes
  const handleOnChenge = (e) => {
    setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value,
    }))
  }
 
  const {firstName, lastName, email , password, confirmPassword,phone} = formData;

  //handle form submmition
  const handleOnSubmit = (e) => {
    e.preventDefault()

    if(password != confirmPassword){
        toast.error("Password Do Not Match")
        return
    }

    const signupData = {
        ...formData,
        accountType,
    }

  
    dispatch(signup(signupData,navigate))

    //reset
    setFormData({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
        phone:"",
    })

    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

  const tabData = [
    {
        id:1,
        tabName:"Student",
        type:ACCOUNT_TYPE.STUDENT,
    },
    {
        id:2,
        tabName:"Instructor",
        type:ACCOUNT_TYPE.INSTRUCTOR,
    }
  ]

  return (
    <div>
        {/* tab */}
        <Tab tabData={tabData} field={accountType} setField={setAccountType}/>

        <form onSubmit={handleOnSubmit} className='flex flex-col gap-5 overflow-hidden '>
            <div className=' flex gap-[20px] '>
                <label>
                    <p className='text-richblack-5 text-[14px] '>First Name <sup className='text-pink-300'>*</sup></p>

                    <input 
                    required
                    type='text'
                    name="firstName"
                    value={firstName}
                    onChange={handleOnChenge}
                    placeholder='First Name'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className='p-[12px] h-[48px] w-[212px] bg-richblack-800 rounded-md'/>

                </label>
                <label>
                    <p className='text-richblack-5 text-[14px] '>Last Name <sup className='text-pink-300'>*</sup></p>

                    <input
                    required 
                    type='text'
                    name="lastName"
                    value={lastName}
                    onChange={handleOnChenge}
                    placeholder='Enter last name'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className='p-[12px] h-[48px] w-[212px] bg-richblack-800 rounded-md'/>
                </label>
                
            </div>

            <label>
                <p className='text-richblack-5 text-[14px] '>
                    Email Address <sup className='text-pink-300'>*</sup></p>
                <input
                required
                type='email'
                name="email"
                value={email}
                onChange={handleOnChenge}
                placeholder='Enter email address'
                style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                }}
                className='p-[12px] h-[48px] w-full bg-richblack-800 rounded-md text-richblack-5'/>
            </label>

           
    <label>
        <p className='text-richblack-5 text-[14px] '>Phone Number <sup className='text-pink-300'>*</sup></p>
       
        <div className='flex flex-row gap-5'>
                    <select
                    className="w-[75px] h-[45px] bg-[#161D29] text-richblack-5
                                border border-[#2C3444] rounded-md
                                text-gray-300 px-3 outline-none"
                    >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                    <option value="+61">+61</option>
                    <option value="+81">+81</option>
                    <option value="+86">+86</option>
                    <option value="+49">+49</option>
                    <option value="+33">+33</option>
                    <option value="+39">+39</option>
                    <option value="+7">+7</option>
                    <option value="+971">+971</option>
                    <option value="+966">+966</option>
                    <option value="+92">+92</option>
                    <option value="+880">+880</option>
                    <option value="+977">+977</option>
                    <option value="+94">+94</option>
                    <option value="+65">+65</option>
                    <option value="+60">+60</option>
                    <option value="+82">+82</option>
                    <option value="+55">+55</option>
                    <option value="+27">+27</option>
                    <option value="+20">+20</option>
                    <option value="+90">+90</option>
                    <option value="+34">+34</option>
                    <option value="+31">+31</option>
                    <option value="+41">+41</option>
                    <option value="+46">+46</option>
                    <option value="+47">+47</option>
                    <option value="+45">+45</option>
                    <option value="+52">+52</option>
                    <option value="+64">+64</option>
                    <option value="+972">+972</option>
                    <option value="+98">+98</option>
                    <option value="+964">+964</option>
                    </select>
            <input
                    required
                    type='text'
                    inputMode="numeric"
                    name="phone"
                    value={phone}
                    onChange={handleOnChenge}
                    placeholder='123456789'
                    className='p-[12px] text-richblack-5 h-[48px] w-[212px] bg-richblack-800 rounded-md'/>
        </div>
        </label> 

            <div className='flex flex-row justify-between'>
                <label className='relative'>
                    <p className='text-richblack-5 text-[14px] '>Create Password <sup className='text-pink-300'>*</sup></p>
                    <input
                    required
                    name='password'
                    value={password}
                    onChange={handleOnChenge}
                    type={showPassword ? 'text' : 'password'}
                    placeholder='Enter Password'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className='relative p-[12px]  h-[48px] w-[212px] bg-richblack-800 rounded-md text-richblack-5'
                        
                    />
                    <span onClick={() => setShowPassword((prev) => !prev)}
                        className='absolute  top-9 right-3 text-richblack-5'>
                        {showPassword ?
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                        (<IoEyeOutline fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>

                <label className='relative'>
                    <p className='text-richblack-5 text-[14px] '>Confirm Password <sup className='text-pink-300'>*</sup></p>
                    <input
                    required
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleOnChenge}
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder='Confirm Password'
                    style={{
                        boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                    }}
                    className='p-[12px] h-[48px] relative w-[212px] bg-richblack-800 rounded-md text-richblack-25'
                    />

                    <span onClick={() => setShowConfirmPassword((prev) => !prev)}
                        className='absolute  top-9 right-3 text-richblack-5'>
                        {showConfirmPassword ?
                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) :
                        (<IoEyeOutline fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>


       
     </div>

        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
        >
          Create Account
        </button>
        </form>
    </div>
    
  )
}

export default SignupForm





















