import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import image1 from "../assets/1.jpg";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.jpg";
import image4 from "../assets/4.jpg";
import image5 from "../assets/5.jpg";
import image6 from "../assets/6.jpg";
import image7 from "../assets/7.jpg";
import image8 from "../assets/8.jpg";

import "swiper/css";
import "swiper/css/effect-fade";

const Hero = ({ onRequestCallBack}) => {
  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

  return (
  <div id="hero" className="font-sans text-gray-800">
    
    {/* Wrapper */}
    <div className="relative w-full flex flex-col md:block">

      {/* Image Section */}
      <div className="relative h-[40vh] md:h-[85vh] w-full overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          loop={true}
          className="h-full w-full"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <div
                className="h-full w-full bg-cover bg-center scale-105"
                style={{ backgroundImage: `url('${src}')` }}
              >
                <div className="absolute inset-0 bg-black/20" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Info Card */}
      <div className="
        bg-white p-4 shadow-2xl rounded-lg
        w-[90%] mx-auto mt-4
        md:absolute md:top-6 md:left-6 md:mt-0 md:max-w-sm md:z-10
      ">
        <div className="text-center space-y-2 flex flex-col items-center">

          <p className="text-gray-600 font-medium tracking-wide">
            Launching Soon
          </p>

          <h1 className="text-xl md:text-2xl font-bold text-slate-900 leading-tight">
            SATYAM METRO SHOWSTOPPER
          </h1>

          <div className="text-sm text-gray-600">
            <p>By Satyam Metro Group</p>
            <p>At Sector 20, Kharghar</p>
          </div>

          {/* Offer Box */}
          <div className="bg-[#de9051] p-3 rounded-md text-white w-full shadow-lg">
            <div className="flex flex-col gap-2 border-2 border-dashed border-white p-2 text-left">
              <p className="flex gap-2">
                ◆ EOI Offer 7X Return
              </p>
              <p className="flex gap-2">
                ◆ EOI 2 BHK 2 Lakh
              </p>
            </div>
          </div>

          <p className="text-gray-600 font-medium">
            2, 3 & 4 BHK Luxuries Apartments
          </p>

          <div className="text-xl md:text-2xl font-bold text-slate-900">
            ₹ On Request
          </div>

          <button onClick={onRequestCallBack} className="bg-[#A67C48] text-white py-2 px-4 rounded-md font-semibold hover:bg-[#8e693c] transition-colors shadow-lg flex items-center gap-2 hover:cursor-pointer">
            Download Brochure
          </button>

        </div>
      </div>

    </div>
  </div>
);

};

export default Hero;
