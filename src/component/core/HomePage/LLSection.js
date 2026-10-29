import HighlightText from './HighlightText'

import know_your_progress  from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import React from 'react'
import CTAButton from './Button'

const LLSection = () => {
  return (
    <div>
      <div className='w-11/12 flex flex-col mx-auto gap-20 mt-32 items-center ' >
        <div className='mx-auto w-[80%]'>

          <h1 className='text-center font-bold text-4xl'>Your swiss knife for 
             <HighlightText text={"learning any language"}/>
          </h1>

          <p className='text-center text-md font-semibold w-[700px] mx-auto mt-3 text-richblack-400'> Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
          </p>

        </div>

        <div className='flex flex-row mx-auto mt'>
          <img src={know_your_progress}
          className='-mr-32'/>

          <img src={compare_with_others}/>

          <img src={plan_your_lesson}
          className='-ml-36'/>
        </div>

        <div className='mb-14'>
          <CTAButton active={true} linkto={"/login"}>
              Learn more
          </CTAButton>
        </div>
       
       
       
      </div>
    </div>
  )
}

export default LLSection

