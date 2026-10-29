import React from 'react'


const Stats = [
    {count: "5K", label: "Active Students"},
    {count: "10+", label: "Mentors"},
    {count: "200+", label: "Courses"},
    {count: "50+", label: "Awards"},
];


const StateComponet = () => {
  return (
   <section>
        <div className='bg-richblack-700 mx-auto p-[80px]'>
            <div className='flex gap-x-5 mx-auto items-center justify-center gap-[50px] mr-4'>
                {
                    Stats.map( (data, index) => {
                        return (
                            <div key={index} className='w-[292.5px]'>
                                <h1 className='font-bold text-[30px] leading-[38px] text-richblack-5'>
                                    {data.count}
                                </h1>
                                <h2 className='font-semibold text-[16px] leading-[24px] text-richblack-500'>
                                    {data.label}
                                </h2>
                            </div>
                        )
                    } )
                }
            </div>
        </div>
    </section>
  )
}

export default StateComponet
