import React from 'react'
import HighlightText from '../../core/HomePage/HighlightText'
const Quote = () => {
  return (
    <div className='w-[1200px] mx-auto text-center text-[36px] leading-[40px]'>
        We are passionate about revolutionizing the way we learn. Our innovative platform
     <HighlightText text={"combines technology"}/>
      <span className='text-brown-500'>
        {" "}
        expertise
      </span>
      , and community to create an

      <span  className='text-brown-500'>
      {" "}
        unparalleled educational experience.
      </span>
    </div>
  )
}

export default Quote
