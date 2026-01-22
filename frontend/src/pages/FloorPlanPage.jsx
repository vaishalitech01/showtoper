import React, { useState } from 'react';
import FloorPlan from '../components/FloorPlan';
import OfferPriceForm from '../components/OfferPriceForm';
import SEO from '../components/SEO';

const FloorPlanPage = () => {
  const [isOfferPriceFormOpen, setIsOfferPriceFormOpen] = useState(false);

  return (
    <>
      <SEO 
        title="Floor Plans | Satyam Metro Showstopper Kharghar | 2, 3, 4 BHK Layouts"
        description="View detailed floor plans and unit layouts for 2, 3 & 4 BHK apartments at Satyam Metro Showstopper, Kharghar. Download master plan and unit plans."
        keywords="floor plans Satyam Metro Showstopper, 2 BHK layout Kharghar, 3 BHK floor plan, 4 BHK unit plan, apartment layouts Navi Mumbai, master plan Kharghar"
        canonical="https://satyammetroshowstoppers.in/floorplan"
      />
      <FloorPlan onOfferPriceClick={() => setIsOfferPriceFormOpen(true)} />
      {isOfferPriceFormOpen && (
        <OfferPriceForm onClose={() => setIsOfferPriceFormOpen(false)} />
      )}
    </>
  );
};

export default FloorPlanPage;