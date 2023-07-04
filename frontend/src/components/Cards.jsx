import React from 'react'
import compare from '../assets/compare.png'
import time from '../assets/time.png'
import risk from '../assets/risk.png'

const Cards = () => {
  return (
    <div className='w-full py-[10rem] px-4 bg-white text-black'>
<h6 className='text-2xl md:text-4xl font-bold text-center py-4' style={{ whiteSpace: 'nowrap' }}>Benefits of Option Chain in Options Trading</h6>
<br></br>
<br></br>
<br></br>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
            <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-200'>
            <img className='w-40 mx-auto mt-[-3rem] bg-white' src={compare} alt="/" />
                <h2 className='text-2xl font-bold py-4 text-center mt-4'>Easy to Compare Options
</h2>
                <div className='text-center font-medium'>
                    <p className='py-2  mx-8 mt-1'>It is simple to compare options since the option chain reveals all of the options that are currently accessible for a given company. Hence it also becomes easy to choose the one that best fits your trading strategy.</p>
                  
                </div>
            </div>
            <div className='w-full bg-white-100 shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-200'>
                <img className='w-40 mx-auto mt-[-3rem] bg-transparent' src={time} alt="/" />
                <h2 className='text-2xl font-bold py-4 text-center mt-4'>Real-Time Data
</h2>
                <div className='text-center font-medium'>
                    <p className='py-2  mx-8 mt-1'>Real-time data equips traders with up-to-date market information for swift decision-making. The dynamic nature of the market necessitates immediate responses, which can only be achieved through real-time and precise data.</p>
                    
                </div>
            </div>
            <div className='w-full shadow-2xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-200'>
                <img className='w-40 mx-auto mt-[-3rem] bg-white' src={risk} alt="/" />
                <h2 className='text-2xl font-bold py-4 text-center mt-2'>Risk Management</h2>
                <div className='text-center font-medium'>
                    <p className='py-2  mx-8 mt-1'>Option chain analysis empowers traders to devise a risk management plan that aligns with their objectives and risk tolerance. By assessing the potential profits and losses of each option based on the underlying asset's current price, traders can minimize the likelihood of losses and enhance their overall revenue.</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Cards