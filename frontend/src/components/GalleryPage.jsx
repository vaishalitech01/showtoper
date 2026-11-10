
import React, { useState, useEffect } from 'react';

import oneCrestKitchen from '../assets/Gallery/one-crest-luxury-kitchen.avif';
import oneCrestBathroom from '../assets/Gallery/one-crest-luxury-batroom.avif';
import oneCrestGym from '../assets/Gallery/one-crest-gym.avif';
import oneCrestLobby from '../assets/Gallery/one-crest-building-lobby.avif';
import oneCrestPlayground from '../assets/Gallery/one-crest-playground.avif';
import oneCrestOpenArea from '../assets/Gallery/one-crest-open-area.avif';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    {
      id: 1,
      src: oneCrestKitchen,
      name: 'Luxury Kitchen',
      category: 'Modern Interiors',
      alt: 'Luxury modular kitchen interior at Satyam Showstopper One Crest, premium apartments in Kharghar, Navi Mumbai',
    },
    {
      id: 2,
      src: oneCrestBathroom,
      name: 'Premium Bathroom',
      category: 'Elegant Interiors',
      alt: 'Modern luxury bathroom design at Satyam Showstopper One Crest residential project in Kharghar, Navi Mumbai',
    },
    {
      id: 3,
      src: oneCrestGym,
      name: 'Modern Gym',
      category: 'Lifestyle Amenities',
      alt: 'Contemporary modern gym facility at One Crest by Satyam Metro Developers, Kharghar, Navi Mumbai',
    },
    {
      id: 4,
      src: oneCrestLobby,
      name: 'Grand Entrance Lobby',
      category: 'Premium Architecture',
      alt: 'Grand residential building entrance lobby at Satyam Showstopper One Crest luxury project, Kharghar, Navi Mumbai',
    },
    {
      id: 5,
      src: oneCrestPlayground,
      name: 'Children’s Play Area',
      category: 'Lifestyle Amenities',
      alt: 'Dedicated children’s outdoor playground at Satyam Showstopper One Crest residential development in Kharghar, Navi Mumbai',
    },
    {
      id: 6,
      src: oneCrestOpenArea,
      name: 'Landscaped Open Spaces',
      category: 'Open & Green Spaces',
      alt: 'Landscaped open recreational area at One Crest by Satyam Metro Developers, Kharghar, Navi Mumbai',
    },
  ];

  // Close preview
  const closePreview = () => {
    setSelectedImage(null);
  };

  // Previous image
  const showPrevious = (e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };

  // Next image
  const showNext = (e) => {
    e.stopPropagation();

    setSelectedImage((prev) =>
      prev === galleryImages.length - 1 ? 0 : prev + 1
    );
  };

  // Keyboard navigation and body scroll lock
  useEffect(() => {
    if (selectedImage === null) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closePreview();
      }

      if (e.key === 'ArrowRight') {
        setSelectedImage((prev) =>
          prev === galleryImages.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === 'ArrowLeft') {
        setSelectedImage((prev) =>
          prev === 0 ? galleryImages.length - 1 : prev - 1
        );
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedImage]);

  return (
    <section className="py-12 px-4 bg-white">
      <div className="max-w-7xl mx-auto">

        {/* Section Heading */}
        <div className="text-center mb-12">
        {/* Gallery Heading */}
<div className="text-center mb-8">
  <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#A67C48]">
    Explore the Experience
  </span>

  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mt-2">
    Satyam Showstopper <span className="text-[#A67C48]">Gallery</span>
  </h2>

  <div className="w-14 h-[2px] bg-[#A67C48] mx-auto mt-4" />
</div>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
            Discover thoughtfully designed interiors, elegant spaces and
            lifestyle amenities at One Crest, Kharghar.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(index)}
              role="button"
              tabIndex={0}
              aria-label={`View full image: ${image.name}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedImage(index);
                }
              }}
              className="group relative overflow-hidden rounded-sm shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#f09051]"
            >
              {/* Image */}
              <div className="aspect-[4/3] w-full bg-gray-100 overflow-hidden">
                <img
                  src={image.src}
                  alt={image.alt}
                  title={image.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Image Title */}
              <div className="absolute bottom-0 left-0 w-full p-3 sm:p-5 transform transition-transform duration-300 group-hover:translate-y-[-3px]">
                <h3 className="text-white text-sm sm:text-lg font-semibold mt-1 tracking-wide">
                  {image.name}
                </h3>

                <div className="w-8 h-[2px] bg-[#f09051] mt-2 transition-all duration-300 group-hover:w-14" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Image Preview / Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center p-3 sm:p-6"
          onClick={closePreview}
          role="dialog"
          aria-modal="true"
          aria-label="Gallery image preview"
        >
          {/* Close Button */}
          <button
            onClick={closePreview}
            aria-label="Close image preview"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition"
          >
            &times;
          </button>

          {/* Previous Button */}
          <button
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition"
          >
            &#8249;
          </button>

          {/* Image Container */}
          <div
            className="relative flex flex-col items-center justify-center w-full h-full max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galleryImages[selectedImage].src}
              alt={galleryImages[selectedImage].alt}
              className="max-w-full max-h-[80vh] sm:max-h-[85vh] w-auto h-auto object-contain rounded-sm shadow-2xl"
            />

            {/* Image Caption */}
            <div className="text-center mt-4">
              <h3 className="text-white text-base sm:text-xl font-semibold">
                {galleryImages[selectedImage].name}
              </h3>

              <p className="text-gray-400 text-xs sm:text-sm mt-1">
                {selectedImage + 1} / {galleryImages.length}
              </p>
            </div>
          </div>

          {/* Next Button */}
          <button
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-white/20 text-white text-3xl flex items-center justify-center transition"
          >
            &#8250;
          </button>
        </div>
      )}
    </section>
  );
};

export default Gallery;
