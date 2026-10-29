import React, { useState } from 'react'
import { BiAbacus, BiSend } from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { sendOtp } from '../services/operations/authAPI'
import {BiArrowBack} from "react-icons/bi"

const SendOtp = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [formData, setFormData] = useState({
        email: ""
    })

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(sendOtp(formData.email, navigate))
    }

    return (
        <div className='flex items-center justify-center h-[100vh] -mt-16'>
            <div className='max-w-[500px] p-8 flex flex-col gap-3'>
                <h1 className='text-richblack-25 text-2xl font-semibold'>Enter Email for OTP Verification</h1>

                <p className='text-richblack-100 leading-[1.rem]'>
                    Enter your email address and we'll send you
                    a 6-digit verification code to continue with signup.
                </p>

                <form onSubmit={handleOnSubmit}
                    className='flex flex-col'
                >
                    <label>
                        <p className="mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5">
                            Email Address <sup className="text-pink-200">*</sup></p>
                    
                        <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    email: e.target.value
                                })
                            }
                            placeholder="Enter your email address"
                            className='form-style w-full p-2 rounded-md'
                        />
                    </label>

                    <button
                        type="submit"
                        className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                    >
                        <p className='flex items-center justify-center gap-7'><BiSend />
                        <span> Send OTP</span></p>
                        
                    </button>
                </form>

                <div className='flex items-center gap-1 mt-6'> 
                    <div className='bg-richblack-300 w-[20%] h-[.5px]'></div>
                    <p className='text-richblack-100'>We'll send the code to this email</p>
                    <div className='bg-richblack-300 w-[20%] h-[.5px]'></div>
                </div>

                

                <div className='flex justify-between'>
                        <Link to="/">
                            <p className="flex items-center gap-x-2 text-richblack-5">
                                <BiArrowBack /> Back To Login
                            </p>
                        </Link>

                        <Link to="/login">
                            <p className='text-blue-300 '>
                                login
                            </p>
                        </Link>
                </div>
            </div>
        </div>
        
    )
}

export default SendOtp

