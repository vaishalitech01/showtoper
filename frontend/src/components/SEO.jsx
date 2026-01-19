import { useEffect } from 'react';

const SEO = ({ title, description, keywords, canonical }) => {
  useEffect(() => {
    // Update title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      }
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords);
      }
    }

    // Update canonical URL
    if (canonical) {
      let linkCanonical = document.querySelector('link[rel="canonical"]');
      if (linkCanonical) {
        linkCanonical.setAttribute('href', canonical);
      }
    }
  }, [title, description, keywords, canonical]);

  return null;
};

export default SEO;

// SEO Keywords for Satyam Metro Showstopper
export const seoKeywords = {
  primary: [
    'Satyam Metro Showstopper',
    'luxury apartments Kharghar',
    '2 BHK Kharghar',
    '3 BHK Kharghar',
    '4 BHK Navi Mumbai',
    'flats in Sector 20 Kharghar'
  ],
  secondary: [
    'property near Kharghar metro',
    'apartments near Kharghar railway station',
    'Navi Mumbai real estate',
    'Satyam Developers',
    'premium flats Kharghar',
    'residential projects Navi Mumbai',
    'luxury homes Kharghar',
    'new launch Kharghar',
    'ready to move flats Navi Mumbai'
  ],
  location: [
    'Sector 20 Kharghar',
    'Kharghar Navi Mumbai',
    'near Kharghar Metro Station',
    'near Kharghar Railway Station',
    'Mumbai Pune Expressway',
    'Belapur CBD',
    'Taloja MIDC'
  ],
  amenities: [
    'luxury amenities',
    'swimming pool',
    'gym',
    'clubhouse',
    'children play area',
    'landscaped gardens',
    'security',
    'parking'
  ]
};
