'use client'

import TitleSection from "./widgets/CommonTitle";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ServiceUI } from "@/types/type";
import axios from "axios";
import {  Inter} from 'next/font/google';

import { useRouter } from "next/navigation";

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });

export default function OurService() {
  const [services , setServices] = useState<ServiceUI[]>([])



  useEffect(() => {
        const getFetch = async () => {
            try{
                const response = await axios.get('/api/services/')
                if(response.status === 200){
                    setServices(response.data['data']) 
                }
            }catch (error : unknown){
                console.log(error) 
            }
        }
        getFetch()
    },[])
  
  const router = useRouter();


  return (
    <section className="relative mt-[100px] flex flex-col items-center px-5 md:px-10 pb-20">
      {/* Content */}
      <div className="mt-10 text-center">
        {/* Main Title */}
        <div  onClick={() => router.push("/services")} className=" cursor-pointer  hover:shadow-2xl max-w-md mx-auto">
          <TitleSection  title="OUR SERVICES" />
        </div>

        {/* Our Services */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4  gap-20 mt-10 px-4">
        {services.slice(0, 4).map((service, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center group pb-8"
          >
            {/* Image Container */}
            <div className="h-[10rem] w-[10rem] border-blue-600 rounded-[2rem] overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center">
              <Image
                alt={service.serviceName}
                src={service.serviceImage?.url || ''}
                width={110}
                height={110}
                className="object-cover"
              />
            </div>


            {/* Service Label */}
            <div
                className={`${inter.className} 
                sm:absolute sm:bottom-0 sm:translate-y-[60%] 
                translate-y-0 relative mt-4
                text-white text-lg sm:text-sm font-sm uppercase 
                w-64 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] 
                h-10 sm:w-44 sm:h-12 flex items-center justify-center 
                rounded-3xl shadow-lg group-hover:scale-110 
                group-hover:bg-blue-700 transition duration-300`}
            >
              <h4>{service.serviceName}</h4>
            </div>
          </div>
        ))}
      </section>


      </div>
    </section>
  );
}
