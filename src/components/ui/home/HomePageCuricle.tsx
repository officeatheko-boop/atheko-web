'use client'
import React from 'react'


import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });


function HomePageCuricle() {
  return (
    <section className='flex   justify-center gap-24' >
        
    <div className="relative size-20">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="4"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#5116E3] dark:text-blue-500" strokeWidth="4" strokeDasharray="100" strokeDashoffset="35" strokeLinecap="round"></circle>
        </svg>
          <div className="absolute top-1/2  -left-10 transform -translate-y-1/2 text-left">
            <span className={`${inter.className} block text-sm font-bold text-black dark:text-blue-500`}>
            2000+
            </span>
            <span className={`${inter.className} block text-sm font-bold text-black dark:text-blue-500`}>
            Services Done
            </span>
        </div>
    </div>

    <div className="relative size-20">
        <svg className="size-full -rotate-90" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-gray-200 dark:text-neutral-700" strokeWidth="4"></circle>
            <circle cx="18" cy="18" r="16" fill="none" className="stroke-current text-[#BA00FF] dark:text-blue-500" strokeWidth="4" strokeDasharray="100" strokeDashoffset="65" strokeLinecap="round"></circle>
        </svg>
          <div className="absolute top-1/2  -left-10 transform -translate-y-1/2 text-left">
            <span className={`${inter.className} block text-sm font-bold text-black dark:text-blue-500`}>
            1000+
            </span>
            <span className={`${inter.className} block text-sm font-bold text-black dark:text-blue-500`}>
            Client Served
            </span>
        </div>
    </div>


    </section>
  )
}

export default HomePageCuricle