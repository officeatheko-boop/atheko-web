'use client'
import BoxReveal from "../../box-reveal";
import { FiArrowUpRight } from "react-icons/fi";
import {  Inter } from 'next/font/google';
import { useRouter } from 'next/navigation'

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });
  


export function BoxRevealDemo() {
  const router = useRouter()
  function handleClick (){
    router.push("/about")
  }
  return (
    <div className="max-md:size-full max-w-lg items-center justify-center overflow-hidden max-md:pt-8 ">
      <BoxReveal boxColor={"white"} duration={0.5}>
        <p className={`text-4xl  md:text-4xl lg:text-7xl  font-madeMummy mb-4 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent`}>
          Laundry Redefined<span className="text-[#BA00FF]">.</span>
        </p>
      </BoxReveal>

      <BoxReveal boxColor={"white"} duration={0.5}>
        <div className={` ${inter.className} mt-6 text-lg md:text-2xl lg:text-1xl mb-6 text-gray-500`}>
          Fast Turnaround, Exceptional Quality, and <span className= " text-gray-700" >Premium Service for the Wardrobe </span>You Love.
        </div>
      </BoxReveal>

      <BoxReveal boxColor={"white"} duration={0.5}>
        <button onClick={handleClick} className={` ${inter.className} text-white bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)]  font-semibold px-6 py-2 rounded-full transition duration-300  flex items-center gap-2`}>
          KNOW MORE
          <FiArrowUpRight />
        </button>
      </BoxReveal>
    </div>
  );
}
