// import React from 'react'
// import HighlightText from './HighlightText'
// import { FaUserGroup } from "react-icons/fa6";
// import { MdPlayLesson } from "react-icons/md";
// const codeData = [
//   {
//      titel:" Learn HTML",
//     discription:"This course covers the basic concepts of HTML icluding creation and structuring web pages , addin text, liks images and more",
//     icon1:<FaUserGroup />,
//     icon1text:"Beginner",
//     icon2:<MdPlayLesson />,
//     icon2text:"6 Lessons",

//   },
//   {
//     titel:" Learn HTML",
//     discription:"This course covers the basic concepts of HTML icluding creation and structuring web pages , addin text, liks images and more",
//     icon1:<FaUserGroup />,
//     icon1text:"Beginner",
//     icon2:<MdPlayLesson />,
//     icon2text:"6 Lessons",
//   },
//   {
//     titel:" Learn HTML",
//     discription:"This course covers the basic concepts of HTML icluding creation and structuring web pages , addin text, liks images and more",
//     icon1:<FaUserGroup />,
//     icon1text:"Beginner",
//     icon2:<MdPlayLesson />,
//     icon2text:"6 Lessons",
//   },
// ];




// const ExploreMore = () => {
//   return (
//     <div>

//       <div className='text-4xl font-semibold text-center text-richblack-25'>
//         Unlock the
//         <HighlightText text={"Power of code"}/>
//       </div>

//       <p className='text-[16px] mt-3 text-center text-richblack-100 font-semibold'>
//          Learn to build anything you can imagine
//       </p>

//       <div className='flex flex-row justify-around '>
//         {codeData.map((element,index) => {
//           return(
//             <div key={index} className='bg-richblack-5 h-[280px] w-[360px] p-7 relative z-50 '>
              
//                 <div>
//                   <h1>{element.titel}</h1>
//                   <p>{element.discription}</p>
//                 </div>

//                 <div>
//                   <div>
//                     <p>{element.icon1}</p>
//                     <p>{element.icon1text}</p>
//                   </div>
//                   <div>
//                     <p>{element.icon2}</p>
//                     <p>{element.icon2text}</p>
//                   </div>
//                 </div>
              
             
              
//               <div className="h-[280px] w-[360px] bg-yellow-50 p-7"></div>            
            
//           )
//         })}
//       </div>

//     </div>
//   )
// }

// export default ExploreMore



import React from "react";
import HighlightText from "./HighlightText";
import { FaUserGroup } from "react-icons/fa6";
import { MdPlayLesson } from "react-icons/md";

const codeData = [
  {
    title: "Learn HTML",
    description:
      "This course covers the basic concepts of HTML including creation and structuring web pages, adding text, links, images and more.",
    icon1: <FaUserGroup />,
    icon1text: "Beginner",
    icon2: <MdPlayLesson />,
    icon2text: "6 Lessons",
  },
  {
    title: "Learn CSS",
    description:
      "Learn how to style web pages using CSS, colors, layouts, spacing and responsive design.",
    icon1: <FaUserGroup />,
    icon1text: "Beginner",
    icon2: <MdPlayLesson />,
    icon2text: "8 Lessons",
  },
  {
    title: "Learn JavaScript",
    description:
      "Understand variables, functions, events and the fundamentals of interactive web development.",
    icon1: <FaUserGroup />,
    icon1text: "Beginner",
    icon2: <MdPlayLesson />,
    icon2text: "10 Lessons",
  },
];

const ExploreMore = () => {
  return (
    <div className="mt-20 mb-20 ">

      {/* Heading */}
      <div className="text-4xl font-semibold text-center text-richblack-25">
        Unlock the{" "}
        <HighlightText text={"Power of code"} />
      </div>

      {/* Subheading */}
      <p className="text-[16px] mt-3 text-center text-richblack-100 font-semibold">
        Learn to build anything you can imagine
      </p>

      {/* Course Cards */}
      <div className="flex flex-wrap justify-center gap-16 mt-10">

        {codeData.map((element) => {
          return (
          <div className="relative ">
            <div
                key={element.title}
                className="bg-richblack-5 text-richblack-900 h-[280px] w-[360px] p-7 flex flex-col  justify-between z-10 relative
                 transition-all duration-300 ease-in-out
                  group-hover:-translate-y-2
                  group-hover:shadow-xl"
              >

                {/* Course Information */}
                <div>
                  <h1 className="text-xl font-semibold mb-4">
                    {element.title}
                  </h1>

                  <p className="text-sm leading-6">
                    {element.description}
                  </p>
                </div>

                {/* Course Details */}
                <div className="flex justify-between items-center border-t border-richblack-300 pt-4">

                  <div className="flex items-center gap-2">
                    <span>{element.icon1}</span>
                    <p className="text-sm">
                      {element.icon1text}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <span>{element.icon2}</span>
                    <p className="text-sm">
                      {element.icon2text}
                    </p>
                  </div>

                </div>
                
            </div>

            <div className="absolute bg-yellow-25 h-[280px] w-[360px] top-5 left-5
            transition-all duration-300 ease-in-out
            group-hover:top-3
            group-hover:left-3
            group-hover:rotate-1"></div>
          </div>
          );
        })}

      </div>
    </div>
  );
};

export default ExploreMore;