import React from 'react';
import { contactConfig } from '../config/credential';
import oneCrestBuilding from '../assets/one-crest-building-design.avif';

const Location = () => {
  const locationData = [
    {
      category: "Connectivity",
      items: [
        "Kharghar Railway Station – 5 mins",
        "Belapur CBD Railway Station – 10 mins",
        "Upcoming Kharghar Metro Station – 3 mins",
        "Proposed Navi Mumbai International Airport – 20 mins"
      ]
    },
    {
      category: "Top Education Institutes",
      items: [
        "Ryan International School – 5 mins",
        "DAV International School – 7 mins",
        "Apeejay School – 10 mins",
        "ITM Business School – 5 mins",
        "NMIMS Navi Mumbai – 10 mins",
        "NIFT Mumbai – 8 mins"
      ]
    },
    {
      category: "Healthcare Access",
      items: [
        "Tata Memorial Hospital (Kharghar) – 5 mins",
        "MGM Hospital – 7 mins",
        "Mitr Hospital – 6 mins",
        "Motherhood Hospital – 10 mins"
      ]
    },
    {
      category: "Shopping & Entertainment",
      items: [
        "Little World Mall – 5 mins",
        "Glomax Mall – 7 mins",
        "Central Park – 3 mins",
        "ISKCON Temple – 5 mins",
        "Golf Course – 5 mins"
      ]
    },
    {
      category: "Road Connectivity",
      items: [
        "Mumbai–Pune Expressway – Quick Access",
        "Sion–Panvel Highway – 10 mins",
        "Close to Belapur & Taloja MIDC"
      ]
    }
  ];

 
return (
  <section
    id="location"
    className="bg-white py-8 px-4 lg:px-6 max-w-7xl mx-auto"
  >
    {/* Header Section */}
    <div className="text-center mb-6 lg:mb-8">
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#9e7242]">
        Find Your Perfect Location
      </span>

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
        Location <span className="text-[#9e7242]">Details</span>
      </h2>

      <div className="w-12 h-[2px] mx-auto mt-3 animated-gradient" />

      <p className="text-xs md:text-sm text-gray-600 leading-6 max-w-3xl mx-auto mt-4">
        Strategically located in{" "}
        <span className="font-semibold text-slate-900">
          Sector 20, Kharghar
        </span>{" "}
        — where every destination is within easy reach through rail, metro,
        expressway, and airport connectivity.
      </p>
    </div>

    {/* Map Section */}
    <div className="w-full h-[280px] sm:h-[350px] lg:h-[430px] overflow-hidden border border-[#9e7242]/25 shadow-sm mb-7 relative bg-gray-50">
      <iframe
        title="Satyam Metro Showstopper Location"
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.234!2d${contactConfig.propertyLocation.longitude}!3d${contactConfig.propertyLocation.latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzUwLjIiTiA3M8KwMDQnMjQuMSJF!5e0!3m2!1sen!2sin!4v1234567890`}
        className="w-full h-full border-0"
        allowFullScreen
        loading="lazy"
      />

      {/* Custom Marker Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full pointer-events-none z-10">
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 overflow-hidden border-[3px] border-[#9e7242] shadow-lg">
            <img
              src={oneCrestBuilding}
              alt="One Crest project location marker - Satyam Metro Showstopper Sector 20 Kharghar Navi Mumbai"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-[#9e7242]" />
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-5">
      {locationData.map((section, index) => (
        <div
          key={index}
          className="border border-[#9e7242]/20 bg-white p-4 shadow-sm transition-all duration-200 hover:border-[#9e7242]/50 hover:shadow-md"
        >
          {/* Category Heading */}
          <h3 className="text-sm font-bold text-slate-900 border-b border-[#9e7242]/20 pb-2.5 mb-3">
            {section.category}
          </h3>

          {/* Location Items */}
          <ul className="space-y-2">
            {section.items.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 group">
                <span className="text-[#f09051] text-xs mt-1 shrink-0">
                  ✦
                </span>

                <span className="text-xs md:text-[13px] text-gray-600 leading-5 font-medium group-hover:text-slate-900 transition-colors">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </section>
);

};

export default Location;