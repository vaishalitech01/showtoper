import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { submitToIndexNow } from '../utils/indexNow';

const DynamicSEO = () => {
  const location = useLocation();
  
  const seoData = {
    '/': {
      title: 'Satyam Metro Showstopper |Properties in Kharghar, Navi Mumbai | New Launch 2026',
      description: 'Discover the best new launch properties in Kharghar by Satyam Metro Developers. Premium 2, 3 & 4 BHK luxury apartments in Sector 20, Kharghar, Navi Mumbai.',
      keywords: 'best properties in Kharghar, new launch in Kharghar, Satyam Developers Kharghar Navi Mumbai, luxury apartments Kharghar'
    },
    '/about': {
      title: 'About Satyam Metro Developers | CMD Rajesh Gulati | Premium Builder Kharghar, Navi Mumbai',
      description: 'Learn about Satyam Metro Developers, led by CMD Rajesh Gulati. Over two decades of creating residential landmarks in Kharghar, Navi Mumbai.',
      keywords: 'Satyam Metro Developers, Rajesh Gulati, real estate developer Kharghar, property builder Navi Mumbai'
    },
    '/price': {
      title: 'Price List | Satyam Metro Showstopper Kharghar | 2, 3, 4 BHK Rates Navi Mumbai',
      description: 'Check latest prices for 2, 3 & 4 BHK luxury apartments at Satyam Metro Showstopper, Sector 20 Kharghar. Starting from ₹2.4 Cr.',
      keywords: 'Satyam Metro Showstopper price, 2 BHK price Kharghar, 3 BHK price Navi Mumbai, property rates Kharghar'
    },
    '/amenities': {
      title: 'Amenities | Satyam Metro Showstopper Kharghar | 30+ Premium Facilities Navi Mumbai',
      description: 'Explore 30+ world-class amenities at Satyam Metro Showstopper Kharghar including swimming pool, gymnasium, clubhouse, spa.',
      keywords: 'amenities Satyam Metro Showstopper, swimming pool Kharghar, gymnasium Navi Mumbai, clubhouse facilities'
    },
    '/floorplan': {
      title: 'Floor Plans | Satyam Metro Showstopper Kharghar | 2, 3, 4 BHK Layouts Navi Mumbai',
      description: 'View detailed floor plans and unit layouts for 2, 3 & 4 BHK apartments at Satyam Metro Showstopper, Sector 20 Kharghar.',
      keywords: 'floor plans Satyam Metro Showstopper, 2 BHK layout Kharghar, apartment layouts Navi Mumbai'
    },
    '/location': {
      title: 'Location | Satyam Metro Showstopper Sector 20 Kharghar | Prime Connectivity Navi Mumbai',
      description: 'Discover the prime location of Satyam Metro Showstopper in Sector 20, Kharghar. 3 mins from Metro Station, 5 mins from Railway Station.',
      keywords: 'Satyam Metro Showstopper location, Sector 20 Kharghar, near Kharghar metro station, connectivity Navi Mumbai'
    },
    '/gallery': {
      title: 'Gallery | Satyam Metro Showstopper Kharghar | Interior & Exterior Images Navi Mumbai',
      description: 'View stunning interior and exterior images of Satyam Metro Showstopper luxury apartments in Sector 20, Kharghar.',
      keywords: 'Satyam Metro Showstopper gallery, interior images Kharghar, luxury apartment photos Navi Mumbai'
    }
  };

  useEffect(() => {
    const currentSEO = seoData[location.pathname] || seoData['/'];
    
    // Update document title
    document.title = currentSEO.title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', currentSEO.description);
    }
    
    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute('content', currentSEO.keywords);
    }
    
    // Update canonical URL
    let canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', `https://satyammetroshowstoppers.in${location.pathname}`);
    }
    
    // Update Open Graph title
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', currentSEO.title);
    }
    
    // Update Open Graph description
    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute('content', currentSEO.description);
    }
    
    // Update Open Graph URL
    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) {
      ogUrl.setAttribute('content', `https://satyammetroshowstoppers.in${location.pathname}`);
    }
    
    // Update Twitter title
    let twitterTitle = document.querySelector('meta[property="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute('content', currentSEO.title);
    }
    
    // Update Twitter description
    let twitterDescription = document.querySelector('meta[property="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute('content', currentSEO.description);
    }
    // Submit current URL to IndexNow for instant indexing
    const currentUrl = `https://satyammetroshowstoppers.in${location.pathname}`;
    submitToIndexNow([currentUrl]);
    
  }, [location.pathname]);

  return null;
};

export default DynamicSEO;