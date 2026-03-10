"use client";

import React, { useState } from "react";


import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });


export default function CustomerSay() {
  const reviews = [
    "With 3 kids at home, I always have my hands full. One less thing to worry about has been my laundry service. From baby bedding to my designer sarees polishing, everything gets picked up and delivered perfectly. Now laundry takes all of a minute - that's the time to book a pickup with Laundrology.",
    "Laundrology has been a lifesaver for my busy schedule. They offer timely pickups and deliveries with excellent quality service. I can't imagine doing laundry without them anymore!",
    "From my daily wear to delicate fabrics, Laundrology has always handled my clothes with utmost care. Highly recommended for their professionalism and punctuality.",
    "The convenience and quality offered by Laundrology are unparalleled. I love how hassle-free their services are, making my life so much easier.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? reviews.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === reviews.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section
      style={{
        backgroundImage: 'url("/home/home-washing-machine.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative  mt-32 flex flex-col items-center justify-between px-5 md:px-10 h-full py-36"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-90"></div>

      {/* Content */}
      <div className="flex flex-col items-center justify-start h-full z-10 mt-10 md:mt-14">
        {/* Heading */}
        <h1 className={`${inter.className} text-2xl md:text-4xl font-bold text-gray-400 text-center z-10`}>
          WHAT <span className="bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent">OUR</span> CUSTOMERS SAY
        </h1>

        {/* Subtitle */}
        <div className="flex flex-col items-center justify-center mt-4 md:mt-6 h-auto px-4">
          <p className={`${inter.className} text-lg md:text-2xl text-black font-medium max-w-2xl md:max-w-5xl text-center mb-6 md:mb-8`}>
            We earn our customer loyalty by providing services that meet and
            exceed expectations and here&apos;s what a few of our valuable
            patrons have to say.
          </p>

          {/* Carousel Section */}
          <div className="relative flex flex-row items-center justify-center w-full max-w-lg md:max-w-5xl mx-auto z-10">
            {/* Left Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 md:left-0 text-xl md:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent p-2 md:p-4 rounded-full hover:bg-blue-100"
              aria-label="Previous"
            >
              &#8592;
            </button>

            {/* Review Text */}
            <div className="flex-1 text-center px-4 md:px-8">
              <p className={`${inter.className} text-base md:text-lg text-black`}>
                {reviews[currentIndex]}
              </p>
            </div>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 md:right-0 text-xl md:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent p-2 md:p-4 rounded-full hover:bg-blue-100"
              aria-label="Next"
            >
              &#8594;
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
