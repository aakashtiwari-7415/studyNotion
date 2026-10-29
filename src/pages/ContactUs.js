import React from 'react'
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { MdOutlineLocationOn, MdCall } from "react-icons/md";
import ContactUsForm from '../component/ContectPage/ContactUsForm';
import Footer from '../component/common/Footer';

const contactDetails = [
  {
    id: 1,
    icon: <IoChatbubbleEllipsesOutline />,
    title: "Chat on us",
    description: "Our friendly team is here to help.",
    info: "email address",
  },
  {
    id: 2,
    icon: <MdOutlineLocationOn />,
    title: "Visit us",
    description: "Come and say hello at our office HQ.",
    info: "Here is the location/address",
  },
  {
    id: 3,
    icon: <MdCall />,
    title: "Call us",
    description: "Mon - Fri: From 8am to 5pm",
    info: "+123 456 7890",
  },
];


const ContactUs = () => {
  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-row gap-10 items-center justify-center mt-[80px] '>

        <div className="flex flex-col gap-8 -mt-[420px] p-10 px-16  bg-richblack-800 rounded-md">
            {contactDetails.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                <div className="text-richblack-100 text-xl">
                    {item.icon}
                </div>

                <div>
                    <h3 className="text-richblack-5 font-semibold">
                    {item.title}
                    </h3>

                    <p className="text-richblack-300 text-sm">
                    {item.description}
                    </p>

                    <p className="text-richblack-300 text-sm">
                    {item.info}
                    </p>
                </div>
                </div>
            ))}
        </div>

        <div className='border-2 border-richblack-700 p-10 w-[698px] rounded-md flex flex-col gap-5'>
            <h1 className='text-[36px] font-semibold text-richblack-5 leading-[40px] w-[594px]'>Got a Idea? We’ve got the skills. Let’s team up</h1>
            <p className='text-[16px] font-medium text-richblack-300'>Tall us more about yourself and what you’re got in mind.</p>

            <ContactUsForm/>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default ContactUs
