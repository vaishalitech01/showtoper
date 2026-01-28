import React from "react";
import { PhoneCall, MapPin } from "lucide-react";
import { contactConfig } from "../config/credential";

const MobileFooter = () => {
  return (
    <>
      {/* Fixed Footer */}
      <div className="fixed bottom-0 left-0 w-full animated-gradient border-t shadow-lg flex lg:hidden z-50">
        <a
          href={contactConfig.propertyLocation.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
        >
          <MapPin size={18} />
          SITE VISIT
        </a>
        <a
          href={`https://wa.me/${contactConfig.phoneNumber}?text=${encodeURIComponent(contactConfig.whatsappMessage)}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => {
            // Track WhatsApp click with gtag
            if (typeof gtag !== 'undefined') {
              gtag('event', 'conversion', {
                'send_to': 'AW-17844583964/ZmpsCTocuobE2s-rxC',
                'value': 1.0,
                'currency': 'INR',
                'event_callback': function() {
                  console.log('Mobile WhatsApp contact conversion tracked');
                }
              });
            }
          }}
          className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
            alt="WhatsApp"
            className="w-6 h-6"
          />
          WHATSAPP
        </a>
        <a
          href={`tel:+${contactConfig.phoneNumber}`}
          className="w-1/3 flex items-center justify-center gap-2 py-3 text-white font-semibold"
        >
          <PhoneCall size={18} />
          CALL
        </a>
      </div>

     
    </>
  );
};

export default MobileFooter;
