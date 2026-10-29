import React from 'react'
import ContactUsForm from '../../ContectPage/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className='flex flex-col gap-3'>
      <h1 className='text-center font-semibold text-[36px] text-richblack-5'>
        Get in Touch
      </h1>

      <p className='mb-6 text-center font-medium text-richblack-300 text-[16px]'>
        We'd love to here for you, Please fill out this form. 
      </p>

      <div>
        <ContactUsForm/>
      </div>
    </div>
  )
}

export default ContactFormSection
