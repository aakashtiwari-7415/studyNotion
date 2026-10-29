import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg';
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg';
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg';
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg';
import timelineImage from '../../../assets/Images/timelineVideo.mp4'
const timeline = [
    {
        Logo:Logo1,
        Heading:"Leadership" ,
        Discription:"Fully committed to the succesfully company"
    }, 
    {
        Logo:Logo2,
        Heading:"Responsibility" ,
        Discription:"Student will always be our top priority"
    },
    {
        Logo:Logo3,
        Heading:"Flexibility" ,
        Discription:"The ability to switch is an importent skills"
    },
    {
        Logo:Logo4,
        Heading:"Solve the problem" ,
        Discription:"Code your way to a solution"
    }
]
const TimelineSection = () => {
  return (
    <div>
      <div className='flex flex-row gap-14 items-center justify-center my-10  w-10/12 mx-auto'>
        <div className=' flex-col flex  gap-8'>
            {
                timeline.map((element ,index) =>{
                    return (
                        <div className='flex flex-row  ' key={index}>

                            <div className='flex flex-col gap-6'>
                               <div className='w-[50px] h-[50px] bg-white flex items-center justify-center rounded-full flex-col'>
                                 <img src={element.Logo}/>
                               </div>
                                
                                <div className={`h-[24px] border-r-2 border-dotted w-[23px] border-pure-greys-400 ${
                                 index === timeline.length - 1 ? "hidden" : "block"}`}></div>
                            </div>
                            
                            <div >
                                <h2 className=' font-semibold text-[18px]'>{element.Heading}</h2>
                                <p className='text-base'>{element.Discription}</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <div className=' relative shadow-blue-200 shadow-lg'>
           

            
            <video
            muted
            loop
            autoPlay
            className='w-[717px] h-[400px]  relative z-10'>
            <source src={timelineImage} type="video/mp4" />
            </video> 
          
          <div   className='w-[717px] h-[400px] bg-white absolute left-[1%] top-[3%] shadow-blue-200 shadow-lg '></div>
          

            <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7 z-20
                   left-[16%] top-[90%] '>

                <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                    <p className='text-3xl font-bold '>10</p>
                    <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                </div>

                <div className=' flex gap-5 items-center px-7'>
                    <p className='text-3xl font-bold'>250</p>
                    <p className='text-caribbeangreen-300 text-sm'>Type of Courses</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineSection
