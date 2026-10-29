import React from 'react'
import HighlightText from '../component/core/HomePage/HighlightText'
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Quote from '../component/common/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StateComponent from '../component/common/AboutPage/StateComponent'
import Footer from '../component/common/Footer'
import LearningGrid from '../component/common/AboutPage/LearningGrid'
import ContactFormSection from '../component/common/AboutPage/ContactFormSection'



const About = () => {
  return (
    <div className=' mx-auto mt-[100px] text-white'>
      {/* section 1 */}

      <section >
        <div className='flex flex-col items-center justify-center '>
            <header className='w-[809px] text-center text-[36px] font-semibold leading-[40px] '>
                Driving Innovation in Online Education for a <br/>
                <HighlightText text={"Brighter Future"} />
                <p className='text-[16px] text-richblack-300 font-medium text-center mt-6 leading-[26px]'>Studynotion is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.</p>
            </header>
            <div className='flex gap-x-7 mt-12 mx-auto'>
                <img src={BannerImage1} className='w-[384px] h-[311px]'/>
                <img src={BannerImage2} />
                <img src={BannerImage3} />
            </div>
        </div>
      </section>

      {/* section 2 */}
      <section>
        <div className='text-center mx-auto mt-20'>
            <Quote/>
        </div>
      </section>

      {/* section 3 */}
      <section className='mt-[100px]'>
        <div className='flex flex-col items-center justify-center w-full'>
            {/* foudning story wala div */}
            <div className='flex flex-row gap-[200px] justify-around'>
                {/* founding story left box */}
                <div className='flex flex-col gap-4 w-[486px] h-[372px]'>
                    <h1 className='font-semibold mb-2 text-[36px] leading-[44px] text-pink-400'>Our Founding Story</h1>

                    <p className='text-richblack-300 text-[16px] leading-[24px] font-medium'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>

                    <p className='text-richblack-300 text-[16px] leading-[24px] font-medium'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                </div>
                {/* foudning story right box */}
                <div className='w-[535px] h-[342px] p-[32px]'>
                    <img  src={FoundingStory} />
                </div>
            </div>

            {/* vision and mission wala parent div */}
            <div className='flex flex-row gap-[220px] justify-around mt-[100px] '>
                {/* left box */}
                <div className='flex flex-col gap-4 w-[486px] h-[372px]'>
                    <h1 className='font-semibold mb-2 text-[36px] leading-[44px] text-yellow-100'>Our Vision</h1>
                    <p className='text-richblack-300 text-[16px] leading-[24px] font-medium'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                </div>

                {/* right box */}
                <div className='flex flex-col gap-4 w-[486px] h-[372px]'>
                    <h1 className='font-semibold mb-2 text-[36px] leading-[44px] text-blue-100'>
                        Our Mission
                    </h1>
                    <p className='text-richblack-300 text-[16px] leading-[24px] font-medium'>Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </div>
      </section> 

      {/* section 4  */}
       <StateComponent/> 

       {/* section 5 */}
      <section className='mx-auto flex flex-col items-center justify-between gap-5 mb-[140px] '>
        <LearningGrid />
        <ContactFormSection />
      </section>


       <Footer/>
    </div>
  )
}

export default About
