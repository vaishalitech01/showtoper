import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import satyamMetroLogo from "../assets/satyam-metro-logo.avif";
import { ChevronLeft, ChevronRight } from "lucide-react";
import oneCrestExterior from "../assets/one-crest-exterior-view.avif";
import swimmingPool from "../assets/luxurious-Poolside-Residential.avif";
import oneCrestGym from "../assets/one-crest-gym.avif";
import oneCrestComplex from "../assets/one-crest-residential-complex.avif";
import oneCrestAerial from "../assets/one-crest-aerial-view.avif";
import oneCrestDesign from "../assets/one-crest-building-design.avif";


const Hero = ({ onRequestCallBack }) => {
  const images = [
    { src: oneCrestExterior, alt: "One Crest luxury apartments exterior view - Satyam Metro Developers Kharghar" },
    { src: oneCrestDesign, alt: "One Crest building design - Luxury 2 3 4 BHK apartments Satyam Metro" },
    { src: swimmingPool, alt: "One Crest swimming pool - Luxurious residential amenities Kharghar" },
    { src: oneCrestGym, alt: "One Crest tower elevation - Satyam Metro luxury development Navi Mumbai" },
    { src: oneCrestComplex, alt: "One Crest residential complex - Modern apartments by Satyam Metro Developers" },
    { src: oneCrestAerial, alt: "One Crest project aerial view - Premium housing in Kharghar Navi Mumbai" },
  ];

  return (
    <div id="hero" className="font-sans text-gray-800">
      {/* Wrapper */}
      <div className="relative w-full flex flex-col lg:block">
        {/* Image Section */}
      
  {/* Hero Image Slider */}
        <div className="relative h-[25vh] md:h-[50vh] lg:h-[85vh] w-full overflow-hidden group">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            pagination={{ clickable: true }}
            navigation={{
              prevEl: ".hero-prev",
              nextEl: ".hero-next",
            }}
            className="h-full w-full hero-swiper"
            role="region"
            aria-roledescription="carousel"
            aria-label="Godrej Varanya project images"
          >
            {images.map((image, index) => (
              <SwiperSlide key={image.src}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-full w-full object-cover object-center"
                  loading={index === 0 ? "eager" : "lazy"}
                  fetchPriority={index === 0 ? "high" : "auto"}
                  decoding="async"
                />
              </SwiperSlide>
            ))}
          </Swiper>
{/* Satyam Metro Logo Watermark */}
<div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10 pointer-events-none">
  <img
    src={satyamMetroLogo}
    alt="Satyam Metro"
    className="
      w-24 sm:w-32 md:w-36 lg:w-40
      h-auto
      object-contain
      opacity-90
      drop-shadow-lg
    "
  />
</div>
          {/* Previous Button */}
          <button
            type="button"
            className="hero-prev absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12
              rounded-full bg-white/80 text-[var(--clr-p)] shadow-lg
              backdrop-blur-sm hover:bg-white hover:scale-110 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={26} />
          </button>

          {/* Next Button */}
          <button
            type="button"
            className="hero-next absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20
              flex items-center justify-center w-9 h-9 sm:w-12 sm:h-12
              rounded-full bg-white/80 text-[var(--clr-p)] shadow-lg
              backdrop-blur-sm hover:bg-white hover:scale-110 transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={26} />
          </button>
        </div>

     {/* Info Card */}
<div
  className="
    bg-white p-3 shadow-xl rounded-sm
    w-[90%] mx-auto mt-3
    lg:absolute lg:top-25 lg:left-14 lg:mt-0 lg:max-w-[320px] lg:z-10"
>
<div className="flex flex-col items-center text-center gap-2">

    <p className="text-xs font-semibold tracking-widest uppercase text-[var(--clr-p)]">
      Launching Soon
    </p>

    <h1 className="text-base lg:text-lg font-bold text-slate-900 leading-snug">
      SATYAM METRO SHOWSTOPPER'S ONE CREST
    </h1>

    <div className="text-xs text-gray-500 leading-relaxed">
      <p>By Satyam Metro Group</p>
      <p>Sector 20, Kharghar</p>
    </div>

    {/* Offer Box */}
    <div
      className="w-full p-2.5 rounded-sm text-white shadow-md"
      style={{
        background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))",
      }}
    >
      <div className="border border-dashed border-white/80 p-2 text-left space-y-2">
        <p className="text-xs font-medium">
          ◆ One Crest – The Luxury You Deserve
        </p>
        <p className="text-xs font-medium">
          ◆ 2, 3 & 4 BHK Starting At ₹2.4 Cr
        </p>
        <p className="text-xs font-medium">
          ◆ G+31 Floors with Spacious Carpet Areas
        </p>
      </div>
    </div>

    <p className="text-xs font-medium text-gray-600">
      2, 3 & 4 BHK Luxury Apartments
    </p>

    <div className="text-lg font-bold text-slate-900">
      ₹ On Request
    </div>

    <button
      onClick={onRequestCallBack}
      className="
        w-full text-white text-xs font-semibold
        py-2.5 px-4 rounded-sm
        flex items-center justify-center
        transition-opacity hover:opacity-90
      "
      style={{
        background: "linear-gradient(135deg, var(--clr-p), var(--clr-s))",
      }}
    >
      Download Brochure →
    </button>

  </div>
</div>
      </div>
    </div>
  );
};

export default Hero;
