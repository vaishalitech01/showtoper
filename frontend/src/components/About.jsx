import React, { useState, useRef, useEffect } from "react";
import oneCrestPoster from "../assets/Poster/one-crest-project-poster.avif";
import {
  Crown,
  Building2,
  Maximize2,
  Sparkles,
  MapPin,
  Home,
  Trees,
  Sofa,
  Palette,
} from "lucide-react";
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
     <div className="text-center mb-10 mt-10">
  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A67C48]">
    Discover Every Detail
  </span>
  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
    Let’s Take a Closer Look at{" "}
    <span className="text-[#A67C48]">Satyam Metro Showstoppers</span>
  </h2>
  <div className="w-14 h-[2px] bg-[#A67C48] mx-auto mt-4" />
</div>

<div className="flex flex-col lg:flex-row gap-8 lg:gap-10 items-start">

  {/* Text Content Column */}
  <div className="flex-1 min-w-0 flex flex-col">

    {/* Always Visible Content */}
    <div className="space-y-4 text-[13px] lg:text-sm text-gray-600 leading-7 text-justify">

      <p>
        Welcome to <b className="text-slate-900 font-semibold">Satyam Metro Showstopper</b> — a landmark
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

      <h3 className="text-base lg:text-lg font-bold text-slate-900 pt-2 pb-0.5">
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

    </div>

    {/* Expandable Location Section */}
    <div
      className="relative overflow-hidden transition-[max-height] duration-700 ease-in-out"
      style={{
        maxHeight: isExpanded ? "2000px" : "0px",
      }}
    >
      <div className="space-y-4 text-[13px] lg:text-sm text-gray-600 leading-7 text-justify pt-2">

        <h3 className="text-base lg:text-lg font-bold text-slate-900">
          Prime Address at Sector 20, Kharghar
        </h3>

        <p>
          Strategically located in the heart of Kharghar, the project enjoys
          excellent connectivity and proximity to major hubs:
        </p>

        <div className="space-y-3 border-l-2 border-[#9e7242]/40 pl-3">

          <p>
            <b className="text-slate-800">Transport & Connectivity:</b>{" "}
            Kharghar Railway Station – 5 mins drive | Belapur CBD Railway
            Station – 10 mins | Upcoming Kharghar Metro Station – 3 mins |
            Proposed Navi Mumbai International Airport – 20 mins
          </p>

          <p>
            <b className="text-slate-800">Educational Institutions:</b>{" "}
            Ryan International School – 5 mins | DAV International School –
            7 mins | Apeejay School – 10 mins | ITM Business School – 5 mins |
            NMIMS Navi Mumbai Campus – 10 mins | NIFT Mumbai – 8 mins
          </p>

          <p>
            <b className="text-slate-800">Healthcare Facilities:</b>{" "}
            Tata Memorial Hospital (Kharghar) – 5 mins | MGM Hospital &
            Research Center – 7 mins | Mitr Hospital – 6 mins |
            Motherhood Hospital – 10 mins
          </p>

          <p>
            <b className="text-slate-800">Shopping & Entertainment:</b>{" "}
            Little World Mall – 5 mins | Glomax Mall – 7 mins |
            Central Park Kharghar – 3 mins | ISKCON Temple – 5 mins |
            Golf Course – 5 mins
          </p>

          <p>
            <b className="text-slate-800">Road Connectivity:</b>{" "}
            Easy access to Mumbai–Pune Expressway | 10 mins to
            Sion–Panvel Highway | Close to Belapur & Taloja MIDC
          </p>

        </div>
      </div>
    </div>

    {/* Read More / Read Less */}
    <button
      onClick={() => setIsExpanded(!isExpanded)}
      className="mt-3 text-[13px] font-semibold text-[#9e7242] hover:text-[#f09051] transition-colors flex items-center gap-2 w-fit"
    >
      {isExpanded ? "Read Less" : "Read More"}
      <span
        className={`text-[10px] transition-transform duration-300 ${
          isExpanded ? "rotate-180" : ""
        }`}
      >
        ▼
      </span>
    </button>

  </div>

  {/* Poster Column */}
  <div className="w-full lg:w-[250px] shrink-0 mx-auto lg:mx-0">
    <div
      ref={posterRef}
      className="overflow-hidden border border-[#9e7242]/30 bg-white shadow-md"
    >
      <img
        src={oneCrestPoster}
        alt="One Crest project poster - Satyam Metro Showstopper luxury apartments Kharghar Navi Mumbai"
        className="w-full h-auto object-contain"
      />
    </div>
  </div>

</div>

      
{/* The New Crest Of Luxury */}
<div className="mt-14 mb-8">

  {/* Heading */}
  <div className="text-center mb-8">
     <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#9e7242]">
 
      Experience Exceptional Living
    </span>
<h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
      The New Crest Of <span className="text-[#A67C48]">Luxury</span>
    </h2>

    <div className="w-14 h-[2px] bg-[#A67C48] mx-auto mt-4" />
  </div>


<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">

  {[
    { icon: <Palette />, text: "Co-Branded Italian Living" },
    { icon: <Building2 />, text: "G+31 Storey Signature Tower" },
    { icon: <Maximize2 />, text: "30% Larger Carpet Size" },
    { icon: <Sparkles />, text: "35+ Amenities & Curated Experiences" },
    { icon: <MapPin />, text: "Kharghar's Prime Location" },
    { icon: <Home />, text: "Luxury 3 & 4 BHK and Select 2 BHK Residences" },
    { icon: <Trees />, text: "Over 1 Lakh Sq. Ft. of Recreational Spaces" },
    { icon: <Sofa />, text: "Stellar Lobby & Verve Clubhouse with Roberto Cavalli Home Interiors" },
    { icon: <Crown />, text: "Italian-Inspired Design Sensibility" },
  ].map((item, index) => (
    <div
      key={index}
      className="
        flex items-center gap-3
        min-h-[64px] p-3
        bg-white border border-[#9e7242]/20
        shadow-sm rounded-sm
        transition-all duration-200
        hover:border-[#A67C48]/60
        hover:shadow-md hover:bg-[#9e7242]/[0.03]
        group
      "
    >
      <div className="
        shrink-0 flex items-center justify-center
        w-9 h-9 rounded-sm
        bg-gradient-to-br from-[#f09051]/15 to-[#9e7242]/15
        text-[#9e7242]
        group-hover:text-[#f09051]
        transition-colors
      ">
        {React.cloneElement(item.icon, {
          size: 18,
          strokeWidth: 1.7,
        })}
      </div>

      <p className="
        text-xs md:text-[13px]
        text-gray-700 font-medium
        leading-snug
        group-hover:text-[#9e7242]
        transition-colors
      ">
        {item.text}
      </p>
    </div>
  ))}

</div>


  {/* Bottom Accent */}
  {/* <div className="mt-8 pt-5 border-t border-[#A67C48]/20 text-center">
    <p className="text-sm md:text-base font-semibold tracking-wide text-slate-800">
      More Than a Residence.{" "}
      <span className="text-[#A67C48]">
        A Statement of Luxury.
      </span>
    </p>
  </div> */}

</div>

    </section>
  );
};

export default About;
