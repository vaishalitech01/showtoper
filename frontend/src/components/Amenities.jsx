import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import oneCrestClubhouse from '../assets/Amenities/one-crest-clubhouse.jpg';
import oneCrestPlayarea from '../assets/Amenities/one-crest-kids-play-area.jpg';
import oneCrestPool from '../assets/Amenities/one-crest-swimming-pool.jpg';
import oneCrestGym from '../assets/Amenities/one-crest-outdoor-gym.jpg';
import oneCrestGames from '../assets/Amenities/one-crest-indoor-games.jpg';
import oneCrestSeniors from '../assets/Amenities/one-crest-senior-citizen-area.jpg';
import oneCrestSpa from '../assets/Amenities/one-crest-spa-wellness.jpg';
import oneCrestTrack from '../assets/Amenities/one-crest-jogging-track.jpg';

const Amenities = () => {
  const amenities = [
    { title: "JOGGING TRACK", img: oneCrestTrack, alt: "One Crest jogging track - Premium fitness amenities Satyam Metro Showstopper Kharghar" },
    { title: "SENIOR CITIZEN CORNER", img: oneCrestSeniors, alt: "One Crest senior citizen area - Community spaces Satyam Metro Developers Navi Mumbai" },
    { title: "INDOOR GAMES", img: oneCrestGames, alt: "One Crest indoor games room - Recreation facilities luxury apartments Kharghar" },
    { title: "SWIMMING POOL", img: oneCrestPool, alt: "One Crest swimming pool - Premium amenities Satyam Metro Showstopper Sector 20" },
    { title: "KIDS PLAY AREA", img: oneCrestPlayarea, alt: "One Crest children play area - Family amenities luxury residential project Kharghar" },
    { title: "OUTDOOR GYM", img: oneCrestGym, alt: "One Crest outdoor gymnasium - Fitness facilities Satyam Metro Developers Navi Mumbai" },
    { title: "CLUB HOUSE", img: oneCrestClubhouse, alt: "One Crest clubhouse - Premium community center Satyam Metro Showstopper Kharghar" },
    { title: "SPA", img: oneCrestSpa, alt: "One Crest spa and wellness center - Luxury amenities Satyam Metro Developers project" },
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
              alt={item.alt}
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
              alt={item.alt}
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
                  alt={item.alt} 
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