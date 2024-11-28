import React from 'react'
import { GoArrowUpRight } from 'react-icons/go'

const button = ({content}:any) => {
  return (
    <button className={`text-pink text-[18px] bg-white gap-3 flex items-center rounded-full p-[2px] mb-4  border-lightpink border-[2px]
    font-medium  group hover:bg-lightpink transition-all duration-300`}>
             <div className="min-w-[45px] h-[45px] flex bg-lightpink justify-center items-center rounded-full
           border-lightpink border-[1px] transform transition-transform duration-300 group-hover:bg-pink  group-hover:rotate-45 group-hover:translate-x-2">
                 <GoArrowUpRight className="-rotate-30 group-hover:text-white text-[28px] text-pink" />
             </div>
             <span className="transform pr-6 transition-transform  duration-300 group-hover:translate-x-2">
                 {content} 
                 </span>
    </button >
  )
}

export default button