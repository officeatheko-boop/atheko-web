'use client'

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import {  Inter} from 'next/font/google';
import { Instagram  , Linkedin , Facebook , BookUser , PhoneForwarded ,Mails , MapPinHouse} from "lucide-react";



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });


const Footer = () => {
  

  return (
    <>
      <footer className="w-full">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-8 py-10 max-sm:max-w-sm max-sm:mx-auto gap-y-8">


                
                <div className="col-span-full mb-10 lg:col-span-2 lg:mb-0">

                <Link href="/#" className="mb-6 inline-block max-w-[160px]">
                    <Image
                    width={150}
                    height={150}
                    src="/core/Atheko-1.svg"
                    alt="Atheko Logo"
                    className="w-auto h-auto"
                    />
                </Link>

                {/* Contact Details */}
                <div className="flex flex-col gap-3 text-sm text-gray-500">
                    <div className="flex items-start gap-2">
                    <BookUser className="min-w-[20px]" color="black" />
                    <span className={`${inter.className} lg:max-w-xs`}>
                        1st Floor, Jalsu Centre, Kannur Rd, West Hill, Calicut, India - 673005
                    </span>
                    </div>

                    <div className="flex items-center gap-2">
                    <PhoneForwarded className="min-w-[20px]" color="black" />
                    <span className={inter.className}>90378 78915</span>
                    </div>

                    <div className="flex items-center gap-2">
                    <PhoneForwarded className="min-w-[20px]" color="black" />
                    <span className={inter.className}>90378 78916</span>
                    </div>

                    <div className="flex items-center gap-2">
                    <Mails className="min-w-[20px]" color="black" />
                    <span className={inter.className}>info.atheko@gmail.com</span>
                    </div>

                    <div className="flex items-center gap-2">
                    <MapPinHouse className="min-w-[20px]" color="black" />
                    <span className={inter.className}>Location</span>
                            <iframe
                            className="w-[120px] h-[120px] rounded-full"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7825.412299376669!2d75.764361724972!3d11.282997767064098!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65f065a9453e9%3A0xbbc96912bc3c277b!2sATHEKO%20PREMIUM%20LAUNDRY!5e0!3m2!1sen!2sin!4v1754811980967!5m2!1sen!2sin"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>

                </div>
                <Link href="/contact" className="mt-5 block">
                    <Button
                    className={`${inter.className} h-9 px-5 bg-gradient-to-r from-[#5116E3] to-[#BA00FF] rounded-full shadow-sm text-xs text-white transition-all duration-500 hover:scale-105 hover:shadow-lg mx-auto lg:mx-0`}
                    >
                    Contact Us
                    </Button>
                </Link>
                </div>

 
                <div className="lg:mx-auto text-left ">
                    <h4 className={`${inter.className} text-lg text-gray-900 font-medium mb-7`}>Atheko</h4>
                    <ul className={`${inter.className}  text-sm  transition-all duration-500`}>
                        <li className="mb-6"><Link href="/"  className="text-gray-600 hover:text-gray-900">Home</Link></li>
                        <li className="mb-6"><Link href="/about"  className=" text-gray-600 hover:text-gray-900">About</Link></li>
                        <li className="mb-6"><Link href="/service"  className=" text-gray-600 hover:text-gray-900">Service</Link></li>
                        <li className="mb-6"><Link href="/contact"  className=" text-gray-600 hover:text-gray-900">Contact Us</Link></li>
                        <li className="mb-6"><Link href="/blog"  className=" text-gray-600 hover:text-gray-900">Blog</Link></li>
                    </ul>
                </div>
 
                <div className="lg:mx-auto text-left ">
                    <h4 className={`${inter.className} text-lg text-gray-900 font-medium mb-7`}>Services</h4>
                    <ul className={`${inter.className} text-sm  transition-all duration-500 uppercase`}>
                        <li className="mb-6">Laundry</li>
                        <li className="mb-6">Premium Laundry</li>
                        <li className="mb-6">Dry Cleaning</li>
                        <li className="mb-6">Steam Ironing</li>
                    </ul>
                </div>
 
                <div className="lg:mx-auto text-left">
                    <h4 className={`${inter.className} text-lg text-gray-900 font-medium mb-7 `}>Services</h4>
                    <ul className={`${inter.className} text-sm  transition-all duration-500 uppercase`}>
                        <li className="mb-6">Wash & Fold</li>
                        <li className="mb-6">Delicate Fabric Handling</li>
                        <li className="mb-6">Shoe Cleaning</li>
                        <li className="mb-6">Linen & Home Textile Cleaning</li>
                    </ul>
                </div>
 
                <div className="lg:mx-auto text-left">
                    <h4 className={`${inter.className} text-lg text-gray-900 font-medium mb-7`}>Services</h4>
                    <ul className={`${inter.className} text-sm  transition-all duration-500 uppercase`}>
                        <li className="mb-6">Express Delivery</li>
                        <li className="mb-6">Fabric Coloring</li>
                        <li className="mb-6">Cloth Polishing</li>
                        <li className="mb-6">Fabric Shredding</li>
                    </ul>
                </div>
            </div>
   
            <div className="py-7 border-t border-gray-200">
                <div className="flex  items-center gap-5    justify-center flex-col lg:justify-start lg:flex-row">
                    <span className={`${inter.className} text-sm text-gray-500`}>©Atheko 2025, All rights reserved.</span>
                    <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                     <a
                        href="https://www.instagram.com/atheko_premium_laundry/profilecard/?igsh=eTg5Zno0dngxZ3Zt"
                        className="w-9 h-9 rounded-full flex justify-center items-center bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#515BD4] hover:opacity-80"
                        >
                        <Instagram color="white" />
                        </a>

                    </div>
                    <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                        <a
                        href="https://www.facebook.com/profile.php?id=61578674197610&notif_id=1753626217798076&notif_t=fan_profile_v2&ref=notif"
                        className="w-9 h-9 rounded-full flex justify-center items-center bg-[#1877F2] hover:opacity-80"
                        >
                        <Facebook color="white" />
                        </a>
                    </div>
                    <div className="flex mt-4 space-x-4 sm:justify-center lg:mt-0 ">
                        <a href="https://www.linkedin.com/company/atheko/" className="w-9 h-9 rounded-full flex justify-center items-center bg-[#0A66C2] hover:opacity-80">
                            <Linkedin color="white" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
    </>
  );
};

export default Footer;
