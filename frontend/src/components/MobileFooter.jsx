
import React from "react";
import { PhoneCall, MapPin } from "lucide-react";
import { contactConfig } from "../config/credential";

const MobileFooter = ({ onRequestCallBack }) => {

  const handleWhatsAppClick = () => {
    // Track WhatsApp click with Google Ads
    if (typeof window.gtag === "function") {
      window.gtag("event", "conversion", {
        send_to: "AW-17844583964/2mpsCJroou0bEJz8-rxC",
      });
    }
  };

  const whatsappUrl = `https://wa.me/${contactConfig.phoneNumber}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`;

  return (
    <div className="fixed bottom-0 left-0 w-full animated-gradient border-t shadow-lg flex lg:hidden z-50">

      {/* Site Visit */}
      <a
        href={contactConfig.propertyLocation.googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
      >
        <MapPin size={18} />
        SITE VISIT
      </a>

      {/* WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick}
        className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
          alt="WhatsApp"
          className="w-6 h-6"
        />
        WHATSAPP
      </a>

      {/* Call */}
      <a
        href={`tel:+${contactConfig.phoneNumber}`}
        className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
      >
        <PhoneCall size={18} />
        CALL
      </a>

    </div>
  );
};

export default MobileFooter;
