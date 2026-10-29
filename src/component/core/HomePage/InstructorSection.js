import React from 'react'
import instructorImage from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './Button'
import { IoIosArrowRoundForward } from "react-icons/io";
const InstructorSection = () => {
  return (
    <div className='w-11/12 flex flex-row mx-auto items-center justify-center gap-[100px] mt-10'>

        <div className='relative'>
          <img
          src={instructorImage}
          alt='instructorImage'
          className='relative z-30'></img>

          <div className='bg-white absolute -top-4 -left-4 z-10 w-[616px] h-[545px]'></div>
        </div>

        <div className='flex flex-col items-start w-[400px] gap-9'>
          <div className='flex flex-col gap-3'>
            <h1 className='text-richblack-5 text-4xl font-bold'>Become on <br/>
            <HighlightText text={"Instructor"}/>
          </h1>
          <p className='text-richblack-200'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
          </p>
          </div>

          <CTAButton active={true} linkto={"/login"}>
          <div className='flex flex-row justify-center items-center gap-2'>
            <p>Start Technic todoy</p>
            <IoIosArrowRoundForward/>
          </div>
          </CTAButton>
      </div>
      
      
      
    </div>
  )
}

export default InstructorSection
