import React from 'react';
import interior1 from '../assets/Gallery/interior1.png';
import interior2 from '../assets/Gallery/interior2.jpg';
import interior3 from '../assets/Gallery/interior3.webp';
import interior4 from '../assets/Gallery/interior4.webp';


const Gallery = () => {
  // Array of gallery items based on the screenshot
  const galleryImages = [
    {
      id: 1,
      src: interior1,
      alt: "Interior Design View"
    },
    {
      id: 2,
      src: interior2,
      alt: "Satyam Metro Showstopper Interior View"
    },
    {
      id: 3,
      src: interior3,
      alt: "Modern Apartment Design"
    },
    {
      id: 4,
      src: interior4,
      alt: "Premium Building Lobby"
    }
  ];

  return (
    <section className="py-4 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-800 text-center mb-16">
          Satyam Show Stopper Gallery
        </h2>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
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