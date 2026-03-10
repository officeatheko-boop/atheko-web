"use client";

import React, { useState, useEffect } from "react";

interface CarouselProps {
  slides: string[];
  interval?: number; // Time in milliseconds for slide change (default is 3000)
}

const Carousel: React.FC<CarouselProps> = ({ slides, interval = 3000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, interval);

    return () => clearInterval(timer); // Cleanup timer on unmount
  }, [interval, slides.length]);

  return (
    <div className="relative w-full h-96 overflow-hidden rounded-3xl">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`, // Move slides based on index
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full h-96 flex-shrink-0 bg-cover bg-center"
            style={{
              backgroundImage: `url(${slide})`,
            }}
          ></div>
        ))}
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
