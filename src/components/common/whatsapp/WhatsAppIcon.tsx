"use client"; // This line enables Client Component behavior

import { FaWhatsapp } from "react-icons/fa";

const WhatsAppIcon = () => {
  const handleClick = () => {
    const phoneNumber = "919037898916";
    const message = "Hello! I would like to know more about your services.";
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };
  return (
    <div
      onClick={handleClick}
      className="fixed bottom-4 right-4 bg-green-500 text-white p-3 rounded-full shadow-lg cursor-pointer transition-transform transform hover:scale-105 hover:rotate-12 hover:shadow-xl"
      style={{ zIndex: 1000 }} // Ensure it's above other elements
    >
      <FaWhatsapp size={24} />
    </div>
  );
};

export default WhatsAppIcon;
