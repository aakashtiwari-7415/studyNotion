import SingupForm from '../Auth/signupForm'
import LoginForm from '../Auth/LoginForm'
import { useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../HomePage/Loader.';

const Template = ({title ,discription1 , discription2 ,Image1, Image,  formType}) => {

   const [clicked, setClicked] = useState(false);
    const {loading } = useSelector((state) => state.auth)
  return (
    <div className=''>

      {
        loading ? 
        (
          <Loader/>
        ) :
        (
          <div className='w-11/12 mx-auto h-full  flex flex-row justify-evenly items-center'>
            <div className='flex flex-col w-[508px] p-[32px] h-[810px] gap-6 '>
                <h1 className='text-[32px] font-semibold text-richblack-5'>
                    {title}
                </h1>
                <p className=''>
                    <span className='text-richblack-25 font-semibold '>{discription1}</span>
                    <span className='text-blue-300 font-edu-sa'>{discription2}</span>
                </p>

                
                {formType === "singup" ?  <SingupForm/> :<LoginForm/>}
              
            </div>

            <div className='relative bottom-12'>
                <img
                src={Image1}
                alt='Pattern'
                width={558}
                height={504}
                loading='lazy'/>

                <img
                src={Image}
                alt='students'
                width={558}
                height={504}
                loading='lazy'
                className='absolute bottom-4 right-4 '
                />
            </div>
          </div>
        )
      }
    
    </div>
  )
}

export default Template
