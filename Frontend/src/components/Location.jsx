import React from 'react';

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
    <section id='location' className="bg-white py-4 px-2 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-1">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Location Details</h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Strategically located in <span className="font-semibold">Sector 20, Kharghar</span> — where every destination is within effortless reach via rail, metro, expressway, and airport routes.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full h-112.5 rounded-lg overflow-hidden border border-gray-200 shadow-sm mb-6">
        <iframe
          title="Satyam Metro Showstopper Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.3123456789!2d73.067!3d19.034!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAyJzAyLjQiTiA3M8KwMDQnMDEuMiJF!5e0!3m2!1sen!2sin!4v1234567890"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>

      {/* Connectivity Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-6 px-8">
        {locationData.map((section, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-xl font-bold text-slate-900 border-b border-gray-300 pb-3 mb-6">
              {section.category}
            </h3>
            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 group">
                  <span className="text-[#A67C48] font-bold text-lg -mt-0.5">✦</span>
                  <span className="text-gray-700 text-[15px] font-medium group-hover:text-black transition-colors">
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