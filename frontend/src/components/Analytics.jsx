import React from 'react'
import Laptop from '../assets/laptop.jpg'

const Analytics = () => {
  return (
    <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4' src={ Laptop } alt="/" />
              <div className='flex flex-col justify-center text-center md:text-start'>
                <p className='text-[#00df9a] font-bold py-2 uppercase'></p>
                <h1 className='text-2xl font-bold md:text-4xl sm:text-3xl'>One Window Strike Price Analysis
</h1>
                <p className='text-gray-500 py-4'>

                Upgrade your options trading game with One Window Strike Price Analysis by ChainSense. Simplify decision-making, access all relevant data in a single window, and stay ahead of market patterns. Optimize your trades with our comprehensive Option Chain.
                </p>
                <br></br>
          <button className='text-white w-[200px] rounded-md font-medium mx-auto px-6 my-3 py-3 bg-[#000300] hover:bg-white hover:border-2 hover:border-black hover:text-black duration-200 md:mx-0'>Get Started</button>
            </div>
        </div>
    </div>
  )
}

export default Analytics