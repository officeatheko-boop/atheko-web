import React from "react";
import { BoxRevealDemo } from "./widgets/LandingText";

export default function Landing() {
  return (
    <section
      style={{
        backgroundImage: 'url("/home/landing.jpg")', // Ensure the image path is correct
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
      className="flex items-center justify-start px-5 md:px-10"
    >
      {/* Left Column Content */}

      <BoxRevealDemo />
    </section>
  );
}
