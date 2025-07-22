// eslint-disable-next-line no-unused-vars
import React from 'react'
import BarChart from './BarChart'
import DonutChart from './DonutChart'
import { FaArrowUp } from "react-icons/fa6";
import ProgressBar from './ProgressBar';


function Charts() {
  return (
    <div className='flex flex-row w-full h-[20rem] gap-4'>
      <div className='flex-1 my-2 bg-white px-2 py-2 text-black h-full shadow-xl flex flex-col'>
        <span className='font-semibold'>Sales</span>
        <div className='pt-2 text-xs flex justify-between items-end'>
          <div className='flex flex-col justify-start'>
            <span className='font-bold'>18,000.00 </span>
            <span className='flex justify-items-start'>Sales over Time</span>
          </div>
          <div className='flex flex-col'>
            <span className='flex items-center'>
              <FaArrowUp size={15} color='green' />33.1%
            </span>
            <span className='flex justify-items-end'>Sales last month</span>
          </div>
        </div>
        <div className='flex-1 flex items-center justify-center'>
          <BarChart />
        </div>
      </div>
      <div className='flex-1 my-2 bg-[rgb(53,58,64)] px-2 py-4 h-full shadow-xl flex flex-col'>
        <div className='flex-1 flex items-center justify-center'>
          <DonutChart />
        </div>
      </div>
      <div className='flex-1 my-2 bg-[#353a40] px-2 py-4 h-full shadow-xl flex flex-col'>
        <div className='flex-1 flex items-center justify-center'>
          <ProgressBar />
        </div>
      </div>
    </div>
  )
}

export default Charts