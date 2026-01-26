import React from 'react';
import oneCrestInterior from '../assets/Gallery/one-crest-luxury-interior.jpg';
import oneCrestLiving from '../assets/Gallery/one-crest-living-room.jpg';
import oneCrestBedroom from '../assets/Gallery/one-crest-bedroom-design.webp';
import oneCrestLobby from '../assets/Gallery/one-crest-building-lobby.webp';


const Gallery = () => {
  // Array of gallery items based on the screenshot
  const galleryImages = [
    {
      id: 1,
      src: oneCrestInterior,
      alt: "One Crest luxury apartment interior design - Premium 2 3 4 BHK homes by Satyam Metro Developers"
    },
    {
      id: 2,
      src: oneCrestLiving,
      alt: "One Crest modern living room interior - Satyam Metro Showstopper luxury apartments Kharghar"
    },
    {
      id: 3,
      src: oneCrestBedroom,
      alt: "One Crest premium apartment bedroom design - Luxury homes Sector 20 Kharghar Navi Mumbai"
    },
    {
      id: 4,
      src: oneCrestLobby,
      alt: "One Crest building lobby and entrance - Satyam Metro Developers premium residential project"
    }
  ];

  return (
    <section className="py-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl lg:text-4xl font-semibold text-slate-800 text-center mb-16">
          Satyam Show Stopper Gallery
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {galleryImages.map((image) => (
            <div 
              key={image.id} 
              className="overflow-hidden rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="aspect-4/3 w-full bg-gray-100">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;