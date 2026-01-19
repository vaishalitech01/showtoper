import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import clubhouse from '../assets/Amenities/clubhouse.jpg';
import playarea from '../assets/Amenities/playarea.jpg';
import pool from '../assets/Amenities/pool.jpg';
import gymnasium from '../assets/Amenities/gymnasium.jpg';
import games from '../assets/Amenities/games.jpg';
import seniorcitizens from '../assets/Amenities/seniorcitizens.jpg';
import spa from '../assets/Amenities/spa.jpg';
import running from '../assets/Amenities/running.jpg';

const Amenities = () => {
  const amenities = [
    { title: "JOGGING TRACK", img: running },
    { title: "SENIOR CITIZEN CORNER", img: seniorcitizens },
    { title: "INDOOR GAMES", img: games },
    { title: "SWIMMING POOL", img: pool },
    { title: "KIDS PLAY AREA", img: playarea },
    { title: "OUTDOOR GYM", img: gymnasium },
    { title: "CLUB HOUSE", img: clubhouse },
    { title: "SPA", img: spa },
  ];

  const firstSwiperAmenities = amenities.filter((_, i) => i % 2 === 0);
const secondSwiperAmenities = amenities.filter((_, i) => i % 2 !== 0);


  return (
    <section id='amenities' className="bg-white py-4 px-5">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-10">
          <h2 className="text-[28px] font-bold text-[#333] leading-tight mb-2">
            Satyam Metro Showstopper
          </h2>
          <h3 className="text-[26px] font-medium text-[#333]">
            Amenities
          </h3>
        </header>

        {/* Mobile View: Horizontal Swiper – Screenshot Style */}
<div className="lg:hidden mb-8">
  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    centeredSlides
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    modules={[Autoplay]}
  >
    {firstSwiperAmenities.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-[28px] mb-3">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-57.5 object-cover"
            />
          </div>
          <span className="text-[16px] font-bold uppercase">
            {item.title}
          </span>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


<div className="lg:hidden">
  <Swiper
    slidesPerView={1}
    spaceBetween={20}
    centeredSlides
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    modules={[Autoplay]}
  >
    {secondSwiperAmenities.map((item, index) => (
      <SwiperSlide key={index}>
        <div className="flex flex-col items-center">
          <div className="w-full overflow-hidden rounded-[28px] mb-3">
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-57.5 object-cover"
            />
          </div>
          <span className="text-[16px] font-bold uppercase">
            {item.title}
          </span>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


        {/* Desktop View: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-12">
          {amenities.map((item, index) => (
            <div key={index} className="flex flex-col items-center group">
              <div className="w-full aspect-4/3 overflow-hidden rounded-[20px] mb-4 shadow-sm">
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <span className="text-sm font-bold text-[#333] tracking-wider uppercase">
                {item.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;