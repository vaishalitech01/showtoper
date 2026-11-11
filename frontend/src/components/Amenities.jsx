import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import oneCrestClubhouse from '../assets/Amenities/one-crest-clubhouse.jpg';
import swimmingPool from "../assets/luxurious-Poolside-Residential.avif";
import oneCrestGym from '../assets/Amenities/one-crest-outdoor-gym.jpg';
import oneCrestGames from '../assets/Amenities/one-crest-indoor-games.avif';
import oneCrestSeniors from '../assets/Amenities/one-crest-senior-citizen-area.avif';
import oneCrestSpa from '../assets/Amenities/one-crest-spa-wellness.jpg';
import oneCrestTrack from '../assets/Amenities/one-crest-jogging-track.webp';
const Amenities = () => {
  const amenities = [
    { title: "JOGGING TRACK", img: oneCrestTrack, alt: "One Crest jogging track - Premium fitness amenities Satyam Metro Showstopper Kharghar" },
    { title: "SENIOR CITIZEN CORNER", img: oneCrestSeniors, alt: "One Crest senior citizen area - Community spaces Satyam Metro Developers Navi Mumbai" },
    { title: "INDOOR GAMES", img: oneCrestGames, alt: "One Crest indoor games room - Recreation facilities luxury apartments Kharghar" },
    { title: "SWIMMING POOL", img: swimmingPool, alt: "One Crest swimming pool - Premium amenities Satyam Metro Showstopper Sector 20" },
    // { title: "KIDS PLAY AREA", img: oneCrestPlayarea, alt: "One Crest children play area - Family amenities luxury residential project Kharghar" },
    { title: "GYM", img: oneCrestGym, alt: "One Crest outdoor gymnasium - Fitness facilities Satyam Metro Developers Navi Mumbai" },
    { title: "CLUB HOUSE", img: oneCrestClubhouse, alt: "One Crest clubhouse - Premium community center Satyam Metro Showstopper Kharghar" },
    { title: "SPA", img: oneCrestSpa, alt: "One Crest spa and wellness center - Luxury amenities Satyam Metro Developers project" },
  ];

  const firstSwiperAmenities = amenities.filter((_, i) => i % 2 === 0);
const secondSwiperAmenities = amenities.filter((_, i) => i % 2 !== 0);


 
return (
  <section id="amenities" className="bg-white py-8 px-4 sm:px-5">
    <div className="max-w-7xl mx-auto">

      {/* Section Heading */}
      <header className="text-center mb-7">
        <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-semibold text-[#9e7242]">
          Crafted for Exceptional Living
        </span>

        <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-2">
          World-Class <span className="text-[#9e7242]">Amenities</span>
        </h2>

        <div className="w-12 h-[2px] bg-gradient-to-r from-[#9e7242] to-[#f09051] mx-auto mt-3" />
      </header>

      {/* Mobile View: 2 Column Image Grid */}
      <div className="grid grid-cols-2 gap-3 lg:hidden">

        {[...firstSwiperAmenities, ...secondSwiperAmenities].map(
          (item, index) => (
            <div
              key={index}
              className="flex flex-col group"
            >
              <div className="w-full aspect-[4/3] overflow-hidden border border-[#9e7242]/20 bg-gray-50">
                <img
                  src={item.img}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="py-2 px-1 text-center">
                <span className="text-[10px] sm:text-xs font-semibold text-gray-700 uppercase tracking-wide leading-snug">
                  {item.title}
                </span>
              </div>
            </div>
          )
        )}

      </div>

      {/* Desktop View: 4 Column Grid */}
      <div className="hidden lg:grid lg:grid-cols-4 gap-x-6 gap-y-8">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="flex flex-col group"
          >
            <div className="w-full aspect-[4/3] overflow-hidden border border-[#9e7242]/20 bg-gray-50">
              <img
                src={item.img}
                alt={item.alt}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            <div className="py-2 text-center">
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                {item.title}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  </section>
);

};

export default Amenities;