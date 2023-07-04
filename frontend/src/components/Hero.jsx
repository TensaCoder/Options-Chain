import React,{ useRef,useEffect } from 'react'
import Typed from 'typed.js'

const Hero = () => {
    const el = useRef(null)
    useEffect(() => {
        const typed = new Typed(el.current, {
            strings: ['Confidence', 'Precision'],
            typeSpeed: 120,
            backSpeed: 140,
            loop: true,
        })
        return () => {
            typed.destroy()
        }
    }, [])
    return (
        <div className='text-white'>

            <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
            <h6 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-4' style={{ whiteSpace: 'nowrap' }}>Option Chains Unleashed</h6>
                
                <p className='text-[#00df9a] font-bold text-sm pb-3 md:text-2xl'></p>
                <div>
                    <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
                    Trade with  <span className='text-gray-700' ref={el}></span>
                    </p>
                </div>
                <br></br>
                <p className='md:w-[75%] md:mx-auto md:text-xl text-sm font-bold text-gray-500'>
                Option Chain Intelligence for Smart Traders: Unleash Profitability with Data-Driven Strategies
                </p>
                <br></br>
                <button className='text-black w-[200px] rounded-md font-medium mx-auto px-6 my-6 py-3  bg-[#00df9a] hover:bg-white duration-200'>Get Started</button>
            </div>
        </div>
    )
}

export default Hero