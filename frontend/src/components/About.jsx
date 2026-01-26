import React, { useState, useRef, useEffect } from "react";
import oneCrestPoster from "../assets/Poster/one-crest-project-poster.jpeg";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [posterHeight, setPosterHeight] = useState(0);
  const posterRef = useRef(null);

  // Measure poster height to sync the text container
  useEffect(() => {
    if (posterRef.current) {
      setPosterHeight(posterRef.current.offsetHeight);
    }
  }, []);

  return (
    <section
      id="about"
      className="max-w-7xl mx-auto px-6 py-4 bg-white scroll-mt-20"
    >
      <h2 className="text-3xl font-semibold text-[#A67C48] text-center mb-10">
        Satyam Metro Showstopper
      </h2>

      <div className="flex flex-col lg:flex-row gap-12 items-start">
        {/* Text Content Column */}
        <div className="flex-1 flex flex-col">
          <div
            className="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
            style={{
              maxHeight: isExpanded ? "2000px" : `${posterHeight}px`,
            }}
          >
            <div className="space-y-6 text-gray-700 leading-relaxed text-md">
              {/* First Two Paragraphs */}
              <p>
                Welcome to <b>Satyam Metro Showstopper</b> — a landmark
                residential address by Satyam Metro Group. Set across a
                sprawling 4-acre premium land parcel, this iconic 40-storey
                development offers exquisitely crafted 2, 3 & 4 BHK luxury
                residences, designed to deliver an elevated urban lifestyle.
                This prestigious community is complemented by world-class
                amenities and premium specifications, ensuring an unmatched
                living experience in Kharghar.
              </p>
              <p>
                Residents enjoy seamless access to every essential — from floor
                plans, pricing, RERA details, construction updates, reviews, and
                project highlights to comprehensive information on amenities,
                location advantages, and more.
              </p>

              {/* Remaining Text (Will be hidden if it exceeds poster height) */}
              <h3 className="text-xl font-bold text-black pt-2">
                A Lifestyle Above the Ordinary
              </h3>
              <p>
                Satyam Metro Showstopper boasts 30+ modern lifestyle amenities,
                including a fully equipped gymnasium, lap pool & kids pool, pool
                loungers, reading lounge, Zumba studio, business centre, yoga &
                meditation zone, spa, senior citizen plaza, indoor games room,
                salon, and a dedicated toddlers’ play area, creating a perfect
                blend of comfort, leisure, and luxury.
              </p>

              <p>
                Prime Address at Sector 20, Kharghar Strategically located in
                the heart of Kharghar, the project enjoys unrivalled
                connectivity and proximity to major hubs: Kharghar Railway
                Station – 5 mins drive | Belapur CBD Railway Station – 10 mins |
                Upcoming Kharghar Metro Station – 3 mins | Proposed Navi Mumbai
                International Airport – 20 mins Educational Institutions: Ryan
                International School – 5 mins | DAV International School – 7
                mins | Apeejay School – 10 mins | ITM Business School – 5 mins |
                NMIMS Navi Mumbai Campus – 10 mins | NIFT Mumbai – 8 mins
                Healthcare Facilities: Tata Memorial Hospital (Kharghar) – 5
                mins | MGM Hospital & Research Center – 7 mins | Mitr Hospital –
                6 mins | Motherhood Hospital – 10 mins Shopping & Entertainment:
                Little World Mall – 5 mins | Glomax Mall – 7 mins | Central Park
                Kharghar – 3 mins | ISKCON Temple – 5 mins | Golf Course – 5
                mins Road Connectivity: Easy access to Mumbai–Pune Expressway |
                10 mins to Sion–Panvel Highway | Close to Belapur & Taloja MIDC
              </p>
            </div>

            {/* Gradient Overlay to fade text when collapsed */}
            {!isExpanded && (
              <div className="absolute bottom-0 left-0 w-full h-20 bg-linear-to-t from-white to-transparent" />
            )}
          </div>

          {/* Read More Button - Always visible below the crop line */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition-colors flex items-center gap-1 w-fit"
          >
            {isExpanded ? "- Read Less" : "+ Read More"}
            <span
              className={`transform transition-transform ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </button>
        </div>

        {/* Poster Column */}
        <div className="w-full lg:w-62.5 shrink-0 mx-auto">
          <div ref={posterRef} className="rounded-lg overflow-hidden">
            <img
              src={oneCrestPoster}
              alt="One Crest project poster - Satyam Metro Showstopper luxury apartments Kharghar Navi Mumbai"
              className="w-full h-100 object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
