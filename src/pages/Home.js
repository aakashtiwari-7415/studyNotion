import React from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowRoundForward } from "react-icons/io";
import HighlightText from '../component/core/HomePage/HighlightText';
import CTAButton from '../component/core/HomePage/Button';
import Banner from "../assets/Images/banner.mp4"
import CodeBlocks from '../component/core/HomePage/CodeBlocks';
import ExploreMore from '../component/core/HomePage/ExploreMore';
import Footer from '../component/common/Footer';
import TimelineSection from '../component/core/HomePage/TimelineSection';
import LLSection from '../component/core/HomePage/LLSection';
import InstructorSection from '../component/core/HomePage/InstructorSection'
import SingUp from '../pages/SingUp'
import Login from './Login'

const Home = () => {
  return (
    <div className='bg-richblack-900'>
      {/* section 1*/}
    <div >
        <Link to={"/signup"}>
            <div className='group mt-16 p-1 mx-auto bg-richblack-800  font-bold rounded-full text-richblack-200
                transition-all duration-200 hover:scale-95 w-fit shadow-2xl    '>
                <div className='flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                        transition-all duration-200 group-hover:bg-richblack-900'>
                    <p>Become an Instroctur</p>
                    <IoIosArrowRoundForward />
                </div>
            </div>
        </Link>

        <div className='mt-6 w-[80%] mx-auto text-center font-bold text-2xl text-richblack-300'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"}/>
        </div>

        <div className='mt-6 w-[50%] mx-auto text-center font-bold text-lg text-richblack-300'>
             With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.   
        </div>

        <div className='flex flex-row gap-7 mt-8 mx-auto w-[17%]'>
            <CTAButton active={true} linkto={"/login"}>
                Learn More
            </CTAButton>

            <CTAButton active={false} linkto={"./login"}>
                Book a Demo
            </CTAButton>
        </div>

        <div className=' my-12 w-[1000px] mx-auto relative '>

            <div className='bg-white w-[1035px] h-[515px] absolute  inset-0 top-4 left-4 shadow-lg shadow-blue-500 '>
            </div>

            <video
            muted
            loop
            autoPlay
             className='w-[1135px] relative z-10'>
            <source src={Banner} type="video/mp4" />
            </video>
           
        </div>
        
        {/* {code section 1} */}
        <div className='w-[60%] mx-auto'>
            <CodeBlocks
                position={"lg:flex-row"}
                heading={
                    <div className='text-4xl text-white font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }

                ctabtn1={
                    {
                        btnText:"try it yourself",
                        linkto:"/signup",
                        active:true,
                    }
                }

                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\n<head>Example<href="styles.css">\n/head>\n<body>\n<h1>Hello World</h1>\n<h2>welcome</h2>\nthis is new qorld</p>\n<button>Click Me</button>\n</body>`}
                // codeColor={"text-yellow-25"}

            />
        </div>

        {/* {code section 2} */}
        <div className='w-[60%] mx-auto'>
            <CodeBlocks
                position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl text-white font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>
                        with our online courses
                    </div>
                }
                subheading={
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }

                ctabtn1={
                    {
                        btnText:"try it yourself",
                        linkto:"/signup",
                        active:true,
                    }
                }

                ctabtn2={
                    {
                        btnText:"learn more",
                        linkto:"/login",
                        active: false,
                    }
                }

                codeblock={`<!DOCTYPE html>\n<html>\nhead><title>Example</title><linkrel="stylesheet"href="styles.css">\n/head>\n<body>\n<h1>Hello World</h1>\n<h2>welcome</h2>\nthis is new qorld</p>\n<button>Click Me</button>\n</body>`}
                // codeColor={"text-yellow-25"}

            />
        </div>

        <ExploreMore/>
    </div>

    {/* section 2*/}
        <div className='bg-pure-greys-5  '>
            
            <div className='w-11/12 flex flex-col items-center justify-between gap-5 mx-auto'>
                <div className='h-[250px]'></div>
                <div className='flex flex-row gap-8'>
                    <CTAButton active={true} linkto={"/signup"}>
                        <div>
                            Explore Full Catalog
                        </div>
                    </CTAButton>
                    <CTAButton active={false} linkto={"/singup"}>
                        <div>
                            Learn more
                        </div>
                    </CTAButton>
                </div>
            </div>

            <div className=' w-11/12 flex flex-row items-center justify-center gap-20 mx-auto mt-44 mb-44'>
                <div className='text-richblack-800 text-2xl w-[500px]  '>
                    Get the skills you need for a 
                    <HighlightText text={"job that is in demand"}/>
                </div>   

                <div className='flex flex-col items-start  gap-6 w-[500px]  '>
                    <p className='text-richblack-800 '>
                        The modern StudyNotion is the dictates its own terms. Today, to be a
                        competitive specialist requires more than professional skills.
                    </p>

                    <CTAButton active={true} linkto={"/login"}>
                        <div className=''>
                            Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>


            <TimelineSection/>
            
            
            <LLSection/>
        </div>

      {/* section 3*/}
        <div>
            <InstructorSection/>

        </div>

      {/* footer*/}
        <Footer/>
    </div>
  )
}

export default Home
