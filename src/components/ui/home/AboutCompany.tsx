import React from "react";
import TitleSection from "./widgets/CommonTitle";
import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });

export default function AboutCompany() {
  return (
    <section
      style={{
        backgroundImage: 'url("/home/home-washing-machine.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="relative flex flex-col items-center justify-between px-5 md:px-10 h-full"
    >
      {/* Overlay for reducing opacity of the background image */}
      <div className="absolute inset-0 bg-white opacity-90" />

      {/* Content */}
      <div className="relative z-10 mt-10 text-center">
        {/* Main Title */}
        <div className="max-w-md mx-auto">
          <TitleSection title="About Our Company" />
        </div>

        {/* Main Subtitle */}
        <h2 className={`${inter.className} mt-10 text-2xl md:text-3xl font-semibold text-black`}>
          Choose <span className="bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent">The Best</span> Premium Laundry
          Service
        </h2>

        {/* Description */}
        <p className={`${inter.className} mt-8 md:mt-18 max-w-6xl text-xl md:text-1xl text-gray-800 mx-auto tracking-wider leading-relaxed`}>
          <span className="leading-relaxed">
            We believe your clothes deserve more than just a wash, 
          </span>
          <span className="block whitespace-nowrap"></span>
          <span className="leading-relaxed">
            <span className="bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent font-bold">
              {" "}
              ATHEKO Premium Laundry 
            </span>
            they deserve care, precision, and perfection. With world-class cleaning technology and expert fabric handling, we deliver garments that look, feel, and
          </span>
          <span className="leading-relaxed">
             smell like new, every single time. We blend modern cleaning technology with eco-friendly care to give your clothes the love they deserve and you the time you deserve.
          </span>
        </p>
      </div>
    </section>
  );
}
