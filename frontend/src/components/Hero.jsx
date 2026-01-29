import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import oneCrestExterior from "../assets/one-crest-exterior-view.png";
import oneCrestFacade from "../assets/one-crest-building-facade.png";
import oneCrestTower from "../assets/one-crest-tower-elevation.jpeg";
import oneCrestComplex from "../assets/one-crest-residential-complex.png";
import oneCrestAerial from "../assets/one-crest-aerial-view.jpg";
import oneCrestDesign from "../assets/one-crest-building-design.png";
import oneCrestProgress from "../assets/one-crest-construction-progress.png";

import "swiper/css";
import "swiper/css/pagination";

const Hero = ({ onRequestCallBack }) => {
  const images = [
    { src: oneCrestExterior, alt: "One Crest luxury apartments exterior view - Satyam Metro Developers Kharghar" },
    { src: oneCrestFacade, alt: "One Crest building facade and architecture - Premium residential project Sector 20 Kharghar" },
    { src: oneCrestTower, alt: "One Crest tower elevation - Satyam Metro luxury development Navi Mumbai" },
    { src: oneCrestComplex, alt: "One Crest residential complex - Modern apartments by Satyam Metro Developers" },
    { src: oneCrestAerial, alt: "One Crest project aerial view - Premium housing in Kharghar Navi Mumbai" },
    { src: oneCrestDesign, alt: "One Crest building design - Luxury 2 3 4 BHK apartments Satyam Metro" },
    { src: oneCrestProgress, alt: "One Crest construction progress - New launch project Kharghar by Satyam Metro" }
  ];

  return (
    <div id="hero" className="font-sans text-gray-800">
      {/* Wrapper */}
      <div className="relative w-full flex flex-col lg:block">
        {/* Image Section */}
        <div className="relative md:h-[50vh] h-[25vh] lg:h-[85vh] sm:h-[25vh]  w-full overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="h-full w-full hero-swiper"
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div
                  className="h-full w-full bg-cover bg-center scale-100"
                  style={{ backgroundImage: `url('${image.src}')` }}
                  role="img"
                  aria-label={image.alt}
                >
                  <div className="absolute inset-0 bg-black/20" />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
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
