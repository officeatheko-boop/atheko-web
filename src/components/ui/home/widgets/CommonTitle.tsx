import React from "react";
import {  Inter} from 'next/font/google';



const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500'], 
    });

interface TitleSectionProps {
  title: string;
}

const TitleSection: React.FC<TitleSectionProps> = ({ title }) => {
  return (
    <div className="p-3 px-4 md:px-6 bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)] rounded-3xl">
      <h1 className={` ${inter.className} text-3xl md:text-4xl lg:text-3xl font-bold text-white text-center bg-[linear-gradient(to_right,_#5116E3,_#BA00FF)]`}>
        {title}
      </h1>
    </div>
  );
};

export default TitleSection;
