"use client";

import { View } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation"; 
import React, { useEffect, useState , CSSProperties  } from "react";
import { ServiceUI } from "@/types/type";
import axios from "axios";
import { FadeLoader  } from "react-spinners";
import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
});



const override: CSSProperties = {
  display: "block",
  margin: "2px auto",
  borderColor: "black", 
};

export default function Services() {
  const router = useRouter();

  const [visibleServices, setVisibleServices] = useState(9);
  const [services , setServices] = useState<ServiceUI[]>([]) 
  const [loading, setLoading] = useState(false); 
  const colour = '#000000'

  const handleViewMore = () => { 
    setVisibleServices(services.length);
  };

  const handleServiceClick = async (service: ServiceUI): Promise<void> => {
    try {
      const serviceData = encodeURIComponent(JSON.stringify(service));
      const path = `/services/${encodeURIComponent(
        service.serviceName
      )}?data=${serviceData}`;
      await router.push(path);
    } catch (error) {
      console.error("Navigation error:", error);
    }

  };


    useEffect(() => {
        const getFetch = async () => { 
          setLoading(true)
            try{
                const response = await axios.get('/api/services/')
                if(response.status === 200){
                    setServices(response.data['data']) 
                }
            }catch (error : unknown){
                console.log(error) 
            }
          setLoading(false)
        }
        getFetch()
    },[])



  return (
    <section className="h-full flex flex-col justify-start items-center">
      <div className="h-full w-full flex flex-col justify-start items-center px-6 md:px-20 mt-10 max-w-7xl">
        {/* Search bar */}
        <div className="w-full md:w-1/2 h-12 rounded-3xl border border-blue-600 transition-all duration-500 hover:shadow-lg">
          <input
            className="w-full h-full rounded-3xl px-5 text-sm md:text-base"
            type="text"
            placeholder="Search"
          />
        </div>

        <div
          className={`flex flex-row  ${
            visibleServices < services.length
              ? "justify-between"
              : "justify-center"
          } items-center w-full mt-10`}
        >
          <p className={`${inter.className} text-xl md:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent`}>Select Your Service</p>
          {visibleServices < services.length && (
            <button
              onClick={handleViewMore}
              className={`${inter.className} flex justify-between gap-4 items-center bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent rounded-sm px-5 py-2 text-sm md:text-3xl font-bold hover:underline`}
            >
              View All 
              <View color="black" />
            </button>
          )}
        </div>

        {/* Services */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 py-10">
          {services.slice(0, visibleServices).map((service, index) => (
            <div
              key={index}
              onClick={() => handleServiceClick(service)}
              className="flex flex-col justify-center  hover:cursor-pointer   items-center gap-3 md:gap-5 animate-fade-in"
            >
              <Image
                width={100}
                height={100}
                src={service.serviceImage.url}
                alt={service.serviceName}
                className="transition-transform duration-300 hover:scale-110"
              />
              <p className={`${inter.className} text-sm md:text-2xl  font-base uppercase text-center`}>
                {service.serviceName}
              </p>
            </div>
          ))}
        </div>

        {/* Offers Section */}
        {visibleServices < services.length && (
          <div className="flex flex-col w-full gap-10 mt-20">
            <div className="flex flex-row justify-between items-center w-full">
              <p className={`${inter.className} text-3xl md:text-5xl font-bold`}>
                LAUNCHING OFFERS!
              </p>
            </div>

            {/* Offer posters */}
            <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6">
              <Image
                src="/services/icons/offers.jpg"
                width={600}
                height={600}
                alt="offer poster"
                className="rounded-md transition-transform duration-300 hover:scale-105"
              />
              <Image
                src="/services/icons/offers.jpg"
                width={600}
                height={600}
                alt="offer poster"
                className="rounded-md transition-transform duration-300 hover:scale-105"
              />
            </div>
          </div>
        )}
      </div>
      <FadeLoader
        color={colour}
        loading={loading}
        cssOverride={override}
        aria-label="Loading Spinner"
        data-testid="loader"
        height={15}    
        width={5}      
        radius={2}     
      />
    </section>
  );
}
