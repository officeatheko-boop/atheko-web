'use client'

import React from 'react'
import {  Inter} from 'next/font/google';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import axios from "axios"
import {  z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form" 
import { Input } from "@/components/ui/input" 
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from "lucide-react"
import libphonenumber from "google-libphonenumber"; 
import {  toast } from 'sonner';
import { Button } from '@/components/ui/button';
// import { clsx } from 'clsx';



const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();

const formSchema = z.object({
  fullName: z.string().min(4, {
    message: "Full Name must be at least 4 characters.",
  }),
  email: z.string().email({
    message: 'Email is required.'
  }),
  number : z.string()
           .nonempty({
                message : "Mobile number is required"
           })
           .refine(
            (mobile) => {
                try{
                    const phoneNumber = phoneUtil.parse(mobile); 
                    return phoneUtil.isValidNumber(phoneNumber);
                }catch(err : unknown){
                    const error = err as Error 
                    console.log(error)
                    return false 
                }
            }),
  message : z.string()
            .min(6,{
                message: "Message must be at least 6 characters.",

            })
            .max(280 , {
                message: "Message must not be more 280 characters.",  
            })
    })





const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });



function ContactHome() {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
        },
        mode: "onTouched"
    })

    const {isSubmitting} = form.formState

    const handleSubmitButton = async (values: z.infer<typeof formSchema>) => {
            if(values){
                try{
                    const response = await axios.post(`/api/contact/`,JSON.stringify(values),{headers: {'Content-Type': 'application/json'}}); 
                    if(response.status == 201){
                        toast.success("Thank you! Your message has been sent successfully. We’ll get back to you shortly.");
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
    <section className="bg-white dark:bg-gray-900 py-10 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center">
            <h1
            className={`${inter.className} 
                bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] 
                bg-clip-text text-transparent 
                text-3xl sm:text-4xl md:text-5xl lg:text-6xl 
                font-semibold text-center`}
            >
            GET IN TOUCH
            </h1>   
        </div>
        <div className="px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-4xl mx-auto space-y-4 text-center">
                <p className={`${inter.className} text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed`}>
                    Use our contact form for all information requests or contact us directly using the contact information below.
                </p>
                <p className={`${inter.className} text-gray-700 dark:text-gray-300  text-base md:text-lg leading-relaxed`}>
                    All information is treated with complete confidentiality and in accordance with our data protection policy.
                </p>
            </div>
        </div>

    


<div className="flex flex-col lg:flex-row justify-center items-center gap-8 px-4 py-10">
  {/* Form Container */}
  <div className="w-full max-w-4xl rounded-3xl border-2 border-[#BA00FF] p-6 lg:p-10">
    <div className="w-full lg:w-[400px] mx-auto">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitButton)} className="space-y-4">
          
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`}>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John"
                    className={`${inter.className} block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 
                      bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 
                      dark:text-gray-300 dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 
                      focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone Number */}
          <FormField
            control={form.control}
            name="number"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`}>
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+971-XX-1234567"
                    className={`${inter.className} block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 
                      bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 
                      dark:text-gray-300 dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 
                      focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`}>
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="johndoe@example.com"
                    className={`${inter.className} block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 
                      bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 
                      dark:text-gray-300 dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 
                      focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Message */}
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className={`${inter.className} block mb-2 text-sm text-gray-600 dark:text-gray-200`}>
                  Message
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Message"
                    className={`${inter.className} block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 
                      bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 
                      dark:text-gray-300 dark:border-[#BA00FF] focus:border-blue-400 dark:focus:border-blue-400 
                      focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40`}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <Button
            type="submit"
            className={`${inter.className} w-full px-6 hover:cursor-pointer py-3 mt-4 text-sm tracking-wide text-white 
              capitalize transition-colors duration-300 transform 
              bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg 
              hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] focus:outline-none 
              focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
          >
            {isSubmitting ? (
              <Button
                className={`${inter.className} w-full bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-lg 
                  hover:bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] focus:outline-none 
                  focus:ring focus:ring-blue-300 focus:ring-opacity-50`}
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              "Send message"
            )}
          </Button>
        </form>
      </Form>
    </div>
  </div>


        <div className="hidden lg:flex lg:absolute left-8 w-[300px] h-[400px] rounded-3xl 
            bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] flex-col justify-center items-center 
            px-4 text-center space-y-4">

            <h1 className={`${inter.className} text-white text-lg font-semibold`}>CONTACT</h1>
            <h1 className={`${inter.className} text-white text-2xl font-semibold`}>INFORMATION</h1>
            <p className={`${inter.className} text-white text-sm font-light leading-relaxed`}>
                All information is treated with complete confidentiality and in accordance with our data protection policy.
            </p>
            </div>

        </div>

    </section>

  )
}

export default ContactHome