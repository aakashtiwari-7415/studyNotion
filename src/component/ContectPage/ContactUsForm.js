import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
//import { apiConnector } from '../../services/apiconnector';
//import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"


const ContactUsForm = () => {

    const [loading , setLoading] = useState(false)
    const {register, handleSubmit,reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("Logging Data", data);
        try{
            setLoading(true);
            const response = {status:"OK"}
            console.log("Logging response", response);
            setLoading(false);
        }catch(error){
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );
  return (
    <form onSubmit={handleSubmit(submitContactForm)}> 
      <div className='flex flex-col gap-3'>
        <div className='flex gap-5'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname' className='text-richblack-5 text-[14px] font-normal'>First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className='bg-richblue-800 w-[258px] p-[12px] rounded-md border-b-2 border-richblack-700'
                        {...register("firstname", {required:true})}
                    />
                    
                </div>

                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname' className='text-richblack-5 text-[14px] font-normal'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className='bg-richblue-800 w-[258px] p-[12px] rounded-md border-b-2 border-richblack-700'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

        </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email' className='text-richblack-5 text-[14px] font-normal'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                     className='bg-richblue-800 w-[536px] p-[12px] rounded-md border-b-2 border-richblack-700'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                
            </div>


        {/* phone no */}
        <div className='flex flex-col'>

                <label htmlFor='phonenumber' className='text-richblack-5 text-[14px] font-normal'>Phone Number</label>

                <div className='flex flex-row gap-4'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                             className='bg-richblue-800 text-richblack-25 w-[180px] p-[12px] rounded-md border-b-2 border-richblack-700'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                             className='bg-richblue-800 p-[12px] rounded-md border-b-2 border-richblack-700'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                

        </div>
        {/* message */}
        <div className='flex flex-col'>
                <label htmlFor='message' className='text-richblack-5 text-[14px] font-normal'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className='bg-richblue-800 w-[563px] p-[12px] rounded-md border-b-2 border-richblack-700'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
               
        </div>


          <button type='submit'
            className='rounded-md bg-yellow-50 w-[563px] text-center p-3 text-[16px] font-bold text-black'>
                    Send Message
            </button>

      </div>
    </form>
  )
}

export default ContactUsForm
