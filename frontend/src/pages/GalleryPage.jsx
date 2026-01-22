import React from 'react';
import Gallery from '../components/GalleryPage';
import SEO from '../components/SEO';

const GalleryPage = () => {
  return (
    <>
      <SEO 
        title="Gallery | Satyam Metro Showstopper Kharghar | Interior & Exterior Images"
        description="View stunning interior and exterior images of Satyam Metro Showstopper luxury apartments in Kharghar. Explore premium designs and architectural excellence."
        keywords="Satyam Metro Showstopper gallery, interior images Kharghar, luxury apartment photos, premium design Navi Mumbai, architectural images"
        canonical="https://satyammetroshowstoppers.in/gallery"
      />
      <Gallery />
    </>
  );
};

export default GalleryPage;