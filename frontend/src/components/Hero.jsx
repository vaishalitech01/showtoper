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
        bg-white p-4 shadow-2xl rounded-lg
        w-[90%] mx-auto mt-4
        lg:absolute lg:top-6 lg:left-6 lg:mt-0 lg:max-w-sm lg:z-10
      "
        >
          <div className="text-center space-y-2 flex flex-col items-center">
            <p className="text-gray-600 font-medium tracking-wide">
              Launching Soon
            </p>

            <h1 className="text-xl lg:text-xl font-bold text-slate-900 leading-tight">
              SATYAM METRO SHOWSTOPPER'S ONE CREST
            </h1>

            <div className="text-sm text-gray-600">
              <p>By Satyam Metro Group</p>
              <p>At Sector 20, Kharghar</p>
            </div>

            {/* Offer Box */}
            <div className="animated-gradient  p-3 rounded-md text-white w-full shadow-lg">
              <div className="flex flex-col gap-2 border-2 border-dashed border-white p-2 text-left">
                <p className="flex gap-2">
                  ◆ One Crest – The Luxury You Deserve
                </p>
                <p className="flex gap-2">◆ 2, 3 & 4 BHK Starting At ₹ 2.4 Cr</p>
                <p className="flex gap-2">
                  ◆ G+31 Floors with Spacious Carpet Areas
                </p>
              </div>
            </div>

            <p className="text-gray-600 font-medium">
              2, 3 & 4 BHK Luxuries Apartments
            </p>

            <div className="text-xl lg:text-2xl font-bold text-slate-900">
              ₹ On Request
            </div>

            <button
              onClick={onRequestCallBack}
              className="animated-gradient text-white py-2 px-4 rounded-md font-semibold transition-colors flex items-center gap-2 hover:cursor-pointer"
            >
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
