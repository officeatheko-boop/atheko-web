"use client";

import React, { useState } from "react";
import {  Inter} from 'next/font/google';
import { Button } from "@/components/ui/button";
import {ChevronLeft , ChevronRight } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import {  z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form" 
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import {  toast } from 'sonner';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });



const formSchema = z.object({
  reviewText : z.string().min(15,{
    message: "Your Review must be at least 15 characters.",
  })
  .max(1000,{
    message:"Your Review not more than 1000 characters."
  })
})




export default function Blog() {
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

   const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            reviewText: "",
        },
        mode: "onTouched"
    })

    const {isSubmitting} = form.formState

    const handleSubmitButton = async (values: z.infer<typeof formSchema>) => {
            if(values){
                try{
                    const response = await axios.post(`/api/review/`,JSON.stringify(values),{headers: {'Content-Type': 'application/json'}}); 
                    if(response.status == 201){
                        toast.success("Thank you for your feedback! Your review has been submitted successfully. If you have anything more to share or need help, feel free to let us know!");
                        form.reset()
                      }else{
                        toast.error(response.data.message);
                    }
                }catch (error : unknown){
                    if(error instanceof Error){
                        toast.error(error.message);
                    }else{
                        toast.error("Something Went Wrong Please Try Again.")                            
                    }
                }
            }else{
                return false 
            }
    }


  return (
    // <section
    //   style={{
    //     backgroundImage: 'url("/home/home-washing-machine.jpg")',
    //     backgroundSize: "cover",
    //     backgroundPosition: "center",
    //   }}
    //   className="h-screen  relative flex flex-col justify-start items-center"
    // >
    //   {/* Overlay for reducing opacity of the background image */}
    //   <div className="absolute inset-0 bg-white opacity-90" />

    //   {/* heading */}
    //   <div className=" mt-16 absolute z-50 h-full flex flex-col justify-center items-center">
    //     <div className="flex flex-row items-center justify-center  gap-10">
    //       <div className="h-[2px] w-14 bg-blue-600 mt-10" />
    //       <h1 className={`${inter.className} text-4xl font-bold mt-10 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent`}>THEY USE OUR SERVICES</h1>
    //       <div className="h-[2px] w-14 bg-blue-600 mt-10" />
    //     </div>
    //     {/* description */}
    //     <p className={`${inter.className} text-2xl max-sm:text-sm max-w-6xl max-sm:max-w-[20rem] text-center mt-10`}>
    //       We earn our customer loyalty by providing services that meet and
    //       exceed expectations and here&apos;s what a few of our valuable patrons
    //       has to say.
    //     </p>
    //     {/* contact Carosel */}
    //     <div className="mt-[5rem] relative flex flex-row items-center justify-center w-full max-w-lg md:max-w-5xl mx-auto z-10">
    //       {/* Left Button */}
    //       <Button onClick={handlePrevious}
    //       className="absolute  left-4  md:left-0 text-xl md:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] p-2 md:p-4 rounded-full hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] hover:shadow-md"
    //         aria-label="Previous"
    //       >
    //         <ChevronLeft color="white" />
    //       </Button>
            

    //       {/* Review Text */}
    //       <div className="flex-1 text-center px-4 md:px-8">
    //         <p className={`${inter.className} text-base md:text-xl text-black`}>
    //           {reviews[currentIndex]}
    //         </p>
    //       </div>

    //       {/* Right Button */}
    //       <Button
    //       onClick={handleNext}
    //       className="absolute right-4 md:right-0 text-xl md:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] p-2 md:p-4 rounded-full hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)]"
    //         aria-label="Next"
    //       >
    //         <ChevronRight color="white" />
    //       </Button>
    //     </div>

    //     <div className="flex items-center  mt-4">
    //         <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //         </svg>
    //         <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //         </svg>
    //         <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //         </svg>
    //         <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //         </svg>
    //         <svg className="w-8 h-8 ms-1 text-yellow-300  dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
    //             <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
    //         </svg>
    //     </div>

    //     <div className="w-[30rem] h-[2px] bg-[#BA00FF] mt-10 " />
        
    //     <div className="container mt-4 " >
    //         <div className=" flex justify-center items-center" >
    //             <h1 className={`${inter.className} font-semibold text-2xl`} >
    //                How You Feeling?, 
    //                <span className="bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent" >
    //                   Submit A Review  
    //                </span>
    //                 of Our Service!!
    //             </h1>
    //         </div>

    //         <div>

    //           <Form {...form}>
    //             <form  onSubmit={form.handleSubmit(handleSubmitButton)}>

    //               <FormField
    //                 control={form.control}
    //                 name="reviewText"
    //                 render={({ field }) => (
    //                     <FormItem>
    //                     <FormLabel className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`} >Message</FormLabel>
    //                     <FormControl>
    //                         <Textarea placeholder="Message" className={`${inter.className} block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300  dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}   {...field} />
    //                     </FormControl>
    //                     <FormMessage />
    //                     </FormItem>
    //                 )}
    //                 /> 
    //               <div className=" flex justify-center items-center" >
    //               <Button type="submit" className={`${inter.className} w-1/2 px-6 hover:cursor-pointer py-3 mt-4 text-sm  tracking-wide text-white capitalize transition-colors duration-300 transform bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}>
    //                   {isSubmitting ? 
    //                       <Button className={`${inter.className} w-full  bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`} disabled>
    //                           < Loader2 className="mr-2 h-4 w-4 animate-spin" />
    //                           Please wait
    //                       </Button>
    //                   : "Send message"}
    //               </Button>
    //               </div>
    //             </form> 
    //             </Form> 

    //         </div>

    //     </div>

    //   </div>
    // </section>

    <section
      style={{
        backgroundImage: 'url("/home/home-washing-machine.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      className="relative py-16 px-4"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-white opacity-90 z-0" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col justify-center items-center max-w-6xl mx-auto text-center">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="h-[2px] w-14 bg-blue-600" />
          <h1 className={`${inter.className} text-3xl sm:text-4xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent`}>
            THEY USE OUR SERVICES
          </h1>
          <div className="h-[2px] w-14 bg-blue-600" />
        </div>

        {/* Description */}
        <p className={`${inter.className} text-base sm:text-xl mt-6 max-w-2xl`}>
          We earn our customer loyalty by providing services that meet and
          exceed expectations and here s what a few of our valuable patrons
          have to say.
        </p>

        {/* Carousel */}
        <div className="mt-12 flex items-center justify-center w-full relative max-w-4xl mx-auto">
          {/* Left Button */}
          <Button
            onClick={handlePrevious}
            className="absolute left-2 sm:left-0 text-xl sm:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] p-2 sm:p-4 rounded-full z-20"
            aria-label="Previous"
          >
            <ChevronLeft color="white" />
          </Button>

          {/* Review Text */}
          <div className="flex-1 text-center px-4 sm:px-8">
            <p className={`${inter.className} text-base sm:text-xl text-black`}>
              {reviews[currentIndex]}
            </p>
          </div>

          {/* Right Button */}
          <Button
            onClick={handleNext}
            className="absolute right-2 sm:right-0 text-xl sm:text-3xl font-bold bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] p-2 sm:p-4 rounded-full z-20"
            aria-label="Next"
          >
            <ChevronRight color="white" />
          </Button>
        </div>

        {/* Star Rating */}
        <div className="flex items-center mt-6">
              <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
              <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-8 h-8 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
              <svg className="w-8 h-8 ms-1 text-yellow-300  dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                  <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
              </svg>
        </div>

        <div className="w-full sm:w-[30rem] h-[2px] bg-[#BA00FF] mt-10" />

        {/* Submit Review Section */}
        <div className="mt-6 w-full px-2 sm:px-0">
          <h2 className={`${inter.className} font-semibold text-xl sm:text-2xl text-center`}>
            How You Feeling?,{" "}
            <span className="bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] bg-clip-text text-transparent">
              Submit A Review
            </span>{" "}
            of Our Service!!
          </h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmitButton)} className="mt-6 max-w-3xl mx-auto">
              <FormField
                control={form.control}
                name="reviewText"
                render={({ field }) => (
                  <FormItem>
                    {/* <FormLabel
                      className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`}
                    >
                      
                    </FormLabel> */}
                    <FormControl>
                      <Textarea
                        placeholder="Message"
                        className={`${inter.className} block w-full h-32 sm:h-56 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-center">
                <Button
                  type="submit"
                  className={`${inter.className} w-full sm:w-full px-6 py-3 mt-4 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
                >
                  {isSubmitting ? (
                    <Button
                      className={`${inter.className} w-full bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg`}
                      disabled
                    >
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </Button>
                  ) : (
                    "Send message"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </section>

  );
}
