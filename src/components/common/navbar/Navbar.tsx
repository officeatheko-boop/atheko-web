"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdCall, MdMenu, MdClose } from "react-icons/md";
import { Inter} from 'next/font/google';

  const inter = Inter({
      subsets: ['latin'],
      weight: ['400', '500'], 
    });

export default function Navbar() {
  interface NavItem {
    item: string;
    link: string;
  }

  const nav: NavItem[] = [
    { item: "Home", link: "/" },
    { item: "About", link: "/about" },
    { item: "Service", link: "/services" },
    { item: "Contact Us", link: "/contact" },
    { item: "Blog", link: "/blog" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };



  return (
    <nav className="flex flex-wrap justify-between items-center px-5 py-5 md:px-10 md:py-10  bg-white shadow-md transition-all duration-500 hover:shadow-lg">
      {/* Logo */}
      <section className="flex-shrink-0 cursor-pointer">
        <Link href="/">
          <Image
            alt="logo"
            src={"/core/Atheko-1.svg"}
            width={150}
            height={150}
            className="transition-transform duration-500 hover:scale-110"
          />
        </Link>
      </section>

      <section className="flex flex-row gap-10">
        {/* Desktop Navigation Links */}
        <section className="hidden lg:flex items-center gap-10">
          {nav.map((navItem, index) => (
            <a
              key={index}
              href={navItem.link}
              className={` ${inter.className} text-lg font-medium text-gray-600 hover:text-blue-500 transition-colors duration-300 hover:scale-110`}
            >
              {navItem.item}
            </a>
          ))}
        </section>
        {/* Get Quote Now (Desktop) */}
        <section className="hidden lg:flex items-center gap-5">
          <div className="p-3 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)]  rounded-3xl cursor-pointer hover:bg-blue-500 transition transform hover:scale-105">
            <h1 className={` ${inter.className} text-xl font-semibold text-white`}>Get Quote Now</h1>
          </div>
          <div className="p-3 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-full cursor-pointer hover:bg-blue-500 transition transform hover:scale-110">
            <MdCall className="text-white text-2xl" />
          </div>
        </section>
      </section>

      {/* Mobile Menu Section */}
      <div className="lg:hidden flex items-center gap-4">
        <button
          onClick={toggleMobileMenu}
          className="text-2xl transition-transform duration-300 hover:rotate-180"
        >
          {isMobileMenuOpen ? <MdClose /> : <MdMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <section className="block lg:hidden w-full mt-5 flex flex-col gap-4 animate-slide-down">
          {nav.map((navItem, index) => (
            <a
              key={index}
              href={navItem.link}
              className={`${inter.className} text-lg font-medium text-center hover:text-blue-500 transition-colors duration-300 hover:scale-110`}
              onClick={() => setIsMobileMenuOpen(false)} // Close menu on item click
            >
              {navItem.item}
            </a>
          ))}
          <div className="p-3 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-3xl text-center cursor-pointer hover:bg-blue-500 transition transform hover:scale-105">
            <h1 className={`${inter.className} text-lg font-semibold text-white`}>Get Quote Now</h1>
          </div>
        </section>
      )}
    </nav>
  );
}
