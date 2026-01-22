import React from 'react';
import About from '../components/About';
import SEO from '../components/SEO';

const AboutPage = () => {
  return (
    <>
      <SEO 
        title="About Satyam Metro Showstopper | Premium Developer in Kharghar, Navi Mumbai"
        description="Learn about Satyam Developers, led by CMD Rajesh Gulati. Over two decades of creating residential landmarks like Queens Necklace and Showstopper in Kharghar, Navi Mumbai."
        keywords="Satyam Developers, Satyam Metro Developers, Rajesh Gulati, real estate Kharghar, property developer Navi Mumbai, Queens Necklace, residential projects"
        canonical="https://satyammetroshowstoppers.in/about"
      />
      <About />
    </>
  );
};

export default AboutPage;